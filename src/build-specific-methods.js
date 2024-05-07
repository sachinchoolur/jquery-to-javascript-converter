const colors = require('colors/safe');

const { program } = require('commander');
const nodeUtils = require('./node-utils');

const options = program.opts();

const buildSpecificMethods = async function main() {
    const outputFile = options.output;
    if (!outputFile) {
        console.log(
            colors.yellow(
                'No output file specified. outputting to jquery-to-js-output.js'
            )
        );
    }
    nodeUtils.generateAlternativeMethodsFromFile(
        options.methods.split(',').map((s) => s.trim()),
        outputFile || 'jquery-to-js-output.js'
    );
};

module.exports = {
    buildSpecificMethods,
};
