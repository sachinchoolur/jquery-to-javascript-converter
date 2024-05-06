#!/usr/bin/env node
var package = require('./package.json');

const replaceJQuery = require('./src/replace-jquery');
const buildFromOptions = require('./src/build-methods');
const buildSpecificMethods = require('./src/build-specific-methods');

const { program } = require('commander');

program
  .option('-o, --output <type>', 'output file')
  .option('-b, --build-all', 'Build vanilla js methods for the selected jQuery methods')
  .option('-m, --methods <type>', 'Build vanilla js methods for the given jquery methods')
  .option('-v, --version', 'output current version')

program.parse(process.argv);
const options = program.opts();
if(options.version) {
    console.log(package.version)
    return 
}

(async function() {
    if(options.buildAll) {
        buildFromOptions.buildFromOptions();
    } else if(options.methods){
        buildSpecificMethods.buildSpecificMethods()
    }else {
        replaceJQuery.replaceJQuery();
    }
})().catch((error) => {
	process.exitCode = 1;
	console.error(error);
});



