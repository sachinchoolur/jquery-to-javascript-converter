const colors = require('colors/safe');
const fs = require('fs-extra');
const estraverse = require('estraverse');
const path = require('path');
const prompts = require('prompts');

const { program } = require('commander');
const utils = require('./utils');
const alljQueryMethods = require('./all-methods');

const options = program.opts();

const buildFromOptions = async function main(config = {}) {
    const vanillaJsMethodsSource = await fs.readFileSync(
        path.resolve(__dirname, '../methods/vanilla-js-methods.js'),
        'utf8'
    );

    const vanillaJaAST = utils.getAST(vanillaJsMethodsSource);
    const vanillaJsMethods = [];
    const vanillaJsLineRef = {};
    estraverse.traverse(vanillaJaAST, {
        enter(node) {
            if (node.type === 'MethodDefinition') {
                if (node.key.name !== 'constructor') {
                    vanillaJsMethods.push(node.key.name);
                    vanillaJsLineRef[node.key.name] = {
                        name: node.key.name,
                        range: {
                            start: node.start,
                            end: node.end,
                        },
                    };
                }
                return estraverse.VisitorOption.Skip;
            }
        },
    });

    const methodsNameSet = new Set(vanillaJsMethods);
    const alljQMethodsSet = new Set(alljQueryMethods);
    const jqueryMethods = [
        ...new Set(
            [...methodsNameSet].filter((method) => alljQMethodsSet.has(method))
        ),
    ];

    const choices = jqueryMethods.sort().map((method) => ({
        title: method,
        value: method,
        selected: true,
    }));

    const response = await prompts({
        type: 'multiselect',
        name: 'value',
        message: 'Generate vanilla js alternatives for',
        choices,
        hint: '- Space to select. Return to submit',
    });

    const outputFile = options.output || process.argv[3];
    if (!outputFile) {
        console.log(
            colors.yellow(
                'No output file specified. outputting to replace-jquery-output.js'
            )
        );
    }
    utils.generateAlternativeMethods(
        response.value,
        outputFile || 'replace-jquery-output.js'
    );
};

module.exports = {
    buildFromOptions,
};
