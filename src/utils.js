const colors = require('colors/safe');
const fs = require('fs-extra');
const path = require('path');
const estraverse = require('estraverse');
const espree = require('espree');

const prettier = require('prettier');
const alljQueryMethods = require('./all-methods');

function traverse(node) {
    while (node) {
        switch (node.type) {
            case 'CallExpression':
                node = node.callee;
                break;
            case 'MemberExpression':
                if (node.object.type === 'ThisExpression') {
                    return node.property;
                }
                node = node.object;
                break;
            case 'Identifier':
                return node;
            default:
                return null;
        }
    }
}

function isjQuery(node) {
    const id = traverse(node);
    return (
        (id && new RegExp('^\\$.').test(id && id.name)) ||
        ['$', 'jQuery'].includes(id && id.name)
    );
}

function getAST(data) {
    return espree.parse(data, {
        ecmaVersion: 2021,
        sourceType: 'module',
        comment: true,
    });
}

async function getjQueryMethodsFromFile(file) {
    console.log(
        colors.yellow(`Finding jQuery function reference in ${file} ...`)
    );

    const data = await fs.readFileSync(file, 'utf8');
    const ast = getAST(data);
    const jQFns = [];
    estraverse.traverse(ast, {
        enter(node) {
            if (node.callee && node.callee.type === 'MemberExpression') {
                if (isjQuery(node)) {
                    jQFns.push(node.callee.property.name);
                }
            }
        },
    });

    const jQFnsSet = new Set(jQFns);
    const alljQMethodsSet = new Set(alljQueryMethods);
    const intersection = new Set(
        [...jQFnsSet].filter((method) => alljQMethodsSet.has(method))
    );
    return [...intersection];
}

const getTemplateData = (data, astMethods) => {
    const templateLines = {
        start: 0,
        end: 0,
    };
    astMethods.comments.forEach((comment) => {
        if (comment.type === 'Block') {
            if (comment.value.includes('$$ Template START $$')) {
                templateLines.start = comment.start;
            } else if (comment.value.includes('$$ Template END $$')) {
                templateLines.end = comment.end;
            }
        }
    });

    const outputStart = data.substring(0, templateLines.start);
    const outputEnd = data.substring(templateLines.end, data.length);
    return {
        outputStart,
        outputEnd,
    };
};
async function getDependedMethods(
    methodsFileData,
    baseMethods,
    generatedMethods,
    lineRef,
    outputStart,
    outputEnd
) {
    const outputAst = getAST(outputStart + baseMethods + outputEnd);
    const dependedMethods = [];
    estraverse.traverse(outputAst, {
        enter(node) {
            if (node.callee && node.callee.type === 'MemberExpression') {
                const methodName = node.callee.property.name;
                if (
                    (node.callee.object.type === 'ThisExpression' ||
                        node.callee.object.type === 'Identifier') &&
                    generatedMethods.indexOf(methodName) < 0
                ) {
                    dependedMethods.push(node.callee.property.name);
                }
            }
        },
    });

    const uniqueDependedMethods = [...new Set(dependedMethods)];
    let methodsData = '';
    uniqueDependedMethods.forEach((method) => {
        if (lineRef[method] && lineRef[method].range) {
            methodsData += methodsFileData.substring(
                lineRef[method].range.start,
                lineRef[method].range.end
            );
        }
    });
    let allMethods = [...generatedMethods, ...uniqueDependedMethods];

    if (uniqueDependedMethods.length) {
        const remainingMethodData = await getDependedMethods(
            methodsFileData,
            baseMethods + methodsData,
            allMethods,
            lineRef,
            outputStart,
            outputEnd
        );
        methodsData += remainingMethodData.methodsData;
        allMethods = [...allMethods, remainingMethodData.allMethods];
    }

    return { methodsData, allMethods };
}

async function generateAlternativeMethods(methodsToGenerate, outputFileName) {
    const lineRef = {};

    const methodsFileData = await fs.readFileSync(
        path.resolve(__dirname, '../methods/vanilla-js-methods.js'),
        'utf8'
    );

    const astMethods = getAST(methodsFileData);

    estraverse.traverse(astMethods, {
        enter(node) {
            if (node.type === 'MethodDefinition') {
                lineRef[node.key.name] = {
                    name: node.key.name,
                    range: {
                        start: node.start,
                        end: node.end,
                    },
                };
                return estraverse.VisitorOption.Skip;
            }
        },
    });
    const remainingMethods = [];

    let baseMethods = '';
    methodsToGenerate.forEach((method) => {
        if (lineRef[method]) {
            baseMethods += methodsFileData.substring(
                lineRef[method].range.start,
                lineRef[method].range.end
            );
        } else {
            remainingMethods.push(method);
        }
    });

    const { outputStart, outputEnd } = getTemplateData(
        methodsFileData,
        astMethods
    );

    const remainingMethodData = await getDependedMethods(
        methodsFileData,
        baseMethods,
        methodsToGenerate,
        lineRef,
        outputStart,
        outputEnd
    );

    const formattedOutput = prettier.format(
        outputStart + baseMethods + remainingMethodData.methodsData + outputEnd,
        {
            parser: 'babel',
            tabWidth: 4,
            singleQuote: true,
        }
    );

    await fs.outputFile(outputFileName, formattedOutput);

    console.log(
        colors.green(
            `Done!. Generated ${outputFileName} with ${
                methodsToGenerate.length - remainingMethods.length
            } jQuery alternative methods.`
        )
    );
    if (remainingMethods.length) {
        console.log(
            colors.red(
                `Did not generate vanillaJs methods for ${remainingMethods.join(
                    ','
                )}, Please consider replacing manually`
            )
        );
    }
}

module.exports = {
    traverse,
    isjQuery,
    getAST,
    getjQueryMethodsFromFile,
    generateAlternativeMethods,
};
