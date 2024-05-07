const colors = require('colors/safe');
const prompts = require('prompts');

const fg = require('fast-glob');

const { program } = require('commander');
const nodeUtils = require('./node-utils');

const options = program.opts();

const outputFile = options.output || process.argv[3];

async function getMethodsFromFiles(files) {
    let methods = [];
    for (const file of files) {
        const methodsFromFile = await nodeUtils.getjQueryMethodsFromFile(file);
        methods = [...methodsFromFile, ...methods];
    }
    return methods;
}

const replaceJQuery = async function main() {
    if (!process.argv[2]) {
        console.log(colors.red('Please specify the source file'));
        return;
    }
    const files = await fg(process.argv[2], { dot: true });

    if (!files.length) {
        console.log(colors.red('No files found!'));
        return;
    }

    const methods = await getMethodsFromFiles(files);

    if (!methods.length) {
        console.log(colors.red('Could not find any jQuery methods'));
        return;
    }

    if (!outputFile) {
        console.log(
            colors.yellow(
                'No output file specified. outputting to jquery-to-js-output.js'
            )
        );
    }

    const choices = methods.map((method) => ({
        title: method,
        value: method,
        selected: true,
    }));
    const response = await prompts({
        type: 'multiselect',
        name: 'value',
        message: `Found ${methods.length} jQuery methods. Generate vanilla js alternatives for`,
        choices,
        hint: '- Space to select. Return to submit',
    });

    nodeUtils.generateAlternativeMethodsFromFile(
        response.value,
        outputFile || 'jquery-to-js-output.js'
    );
};

module.exports = {
    replaceJQuery,
};
