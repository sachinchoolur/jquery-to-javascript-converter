const colors = require('colors/safe');

const { program } = require('commander');
const utils = require('./utils');

const options = program.opts();

const buildSpecificMethods = async function main(config = {}) {
    const outputFile = options.output;
    if (!outputFile) {
        console.log(
            colors.yellow(
                'No output file specified. outputting to replace-jquery-output.js'
            )
        );
    }
    utils.generateAlternativeMethods(
        options.methods.split(',').map((s) => s.trim()),
        outputFile || 'replace-jquery-output.js'
    );
};

module.exports = {
    buildSpecificMethods,
};
