const espree = require('espree');
const estraverse = require('estraverse');
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
// Detect jQuery methods
// @tod Add an option to pass regex for finding jQuery methods
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


async function generateAlternativeMethods(methodsToGenerate, methodsFileData) {
    const lineRef = {};
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
    return {
        data: outputStart + baseMethods + remainingMethodData.methodsData + outputEnd,
        remainingMethods,
    };
}

async function getJQueryMethodsFromSource(data) {
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


module.exports = {
    traverse,
    isjQuery,
    getAST,
    generateAlternativeMethods,
    getJQueryMethodsFromSource
};
