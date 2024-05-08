const colors = require('colors/safe');
const fs = require('fs-extra');
const path = require('path');


const prettier = require('prettier');

const utils = require('./utils');


async function getjQueryMethodsFromFile(file) {
    console.log(
        colors.yellow(`Finding jQuery function reference in ${file} ...`)
    );

    const data = await fs.readFileSync(file, 'utf8');
    return utils.getJQueryMethodsFromSource(data);
}

async function generateAlternativeMethodsFromFile(methodsToGenerate, outputFileName) {
    const methodsFileData = await fs.readFileSync(
        path.resolve(__dirname, '../methods/vanilla-js-methods.js'),
        'utf8'
        );
        
    const generatedMethods = await utils.generateAlternativeMethods(methodsToGenerate, methodsFileData);
    const formattedOutput = prettier.format(
        generatedMethods.data,
        {
            parser: 'babel',
            tabWidth: 4,
            singleQuote: true,
        }
    );

    await fs.outputFile(outputFileName, formattedOutput);

    if (methodsToGenerate.length - generatedMethods.remainingMethods.length) {
        console.log(
            colors.green(
                `Done!. Generated ${outputFileName} with ${
                    methodsToGenerate.length - generatedMethods.remainingMethods.length
                } jQuery alternative methods.`
            )
        );
    }
    if (generatedMethods.remainingMethods.length) {
        console.log(
            colors.red(
                `Did not generate vanillaJs methods for ${generatedMethods.remainingMethods.join(
                    ','
                )}, Please consider replacing manually`
            )
        );
    }
}

module.exports = {
    getjQueryMethodsFromFile,
    generateAlternativeMethodsFromFile,
};
