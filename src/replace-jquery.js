const colors = require('colors/safe');
const prompts = require('prompts');

const fg = require('fast-glob');

const { program } = require('commander');
const utils = require('./utils');

const options = program.opts();

const outputFile = options.output || process.argv[3];

async function getMethodsFromFiles(files) {
    let methods = [];
    for (const file of files) {
        const methodsFromFile = await utils.getjQueryMethodsFromFile(file);
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

    const methods = await getMethodsFromFiles(files);

    if (!methods.length) {
        colors.red('Could not find any jQuery methods');
        return;
    }

    if (!outputFile) {
        console.log(
            colors.yellow(
                'No output file specified. outputting to replace-jquery-output.js'
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

    utils.generateAlternativeMethods(
        response.value,
        outputFile || 'replace-jquery-output.js'
    );
};

module.exports = {
    replaceJQuery,
};
