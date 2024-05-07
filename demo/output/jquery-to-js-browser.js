(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('bundle-text:./methods/vanilla-js-methods.txt')) :
    typeof define === 'function' && define.amd ? define(['bundle-text:./methods/vanilla-js-methods.txt'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.data));
}(this, (function (data) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var data__default = /*#__PURE__*/_interopDefaultLegacy(data);

    const utils = require('./utils');

    async function plugin(source) {
      console.log('alljQueryMethods', source);
      const methods = await utils.getJQueryMethodsFromSource(source);
      console.log('methods', methods);
      console.log('methodsFilesssssData', data__default['default']);
      const generatedMethods = await utils.generateAlternativeMethods(methods, data__default['default']);
      console.log('generatedMethods', generatedMethods);
      const formattedOutput = await prettier.format(generatedMethods.data, {
        parser: 'babel',
        tabWidth: 4,
        plugins: prettierPlugins,
        singleQuote: true
      });
      return {
        formattedOutput,
        methodsFound: methods,
        remainingMethods: generatedMethods.remainingMethods
      };
    }

    window.ReplaceJquery = plugin;

})));
