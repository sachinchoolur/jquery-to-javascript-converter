

// eslint-disable-next-line import/no-unresolved
import data from "bundle-text:./methods/vanilla-js-methods.txt"

const utils = require('./utils');


async function plugin(source) {
    const methods = await utils.getJQueryMethodsFromSource(source);
    const generatedMethods = await utils.generateAlternativeMethods(methods, data);

    // eslint-disable-next-line no-undef
    const formattedOutput = await prettier.format(
        generatedMethods.data,
        {
            parser: 'babel',
            tabWidth: 4,
            // eslint-disable-next-line no-undef
            plugins: prettierPlugins,
            singleQuote: true,
        }
    );

    return {
        formattedOutput,
        methodsFound: methods,
        remainingMethods: generatedMethods.remainingMethods,
    };
}

window.ReplaceJquery = plugin;
