const colors = require('colors/safe');
const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');

const { program } = require('commander');
const nodeUtils = require('./node-utils');
const utils = require('./utils');

const options = program.opts();

const buildFromOptions = async function main() {
    const vanillaJsMethodsSource = await fs.readFileSync(
        path.resolve(__dirname, '../methods/vanilla-js-methods.js'),
        'utf8'
    );

    const jqueryMethods = utils.getJQueryMethodsFromSource(vanillaJsMethodsSource);

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
    nodeUtils.generateAlternativeMethodsFromFile(
        response.value,
        outputFile || 'replace-jquery-output.js'
    );
};

module.exports = {
    buildFromOptions,
};
