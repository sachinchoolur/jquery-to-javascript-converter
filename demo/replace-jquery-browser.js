const alljQueryMethods=  [
    'add',
    'addBack',
    'addClass',
    'after',
    'ajax',
    'ajaxComplete',
    'ajaxError',
    'ajaxPrefilter',
    'ajaxSend',
    'ajaxSetup',
    'ajaxStart',
    'ajaxStop',
    'ajaxSuccess',
    'ajaxTransport',
    'animate',
    'append',
    'appendTo',
    'attr',
    'attr',
    'before',
    'bind',
    'blur',
    'camelCase',
    'change',
    'children',
    'cleanData',
    'clearQueue',
    'click',
    'clone',
    'clone',
    'closest',
    'constructor',
    'contains',
    'contents',
    'contextmenu',
    'css',
    'css',
    'data',
    'data',
    'dblclick',
    'delay',
    'delegate',
    'dequeue',
    'dequeue',
    'detach',
    'each',
    'each',
    'empty',
    'end',
    'eq',
    'error',
    'escapeSelector',
    'even',
    'extend',
    'extend',
    'fadeIn',
    'fadeOut',
    'fadeTo',
    'fadeToggle',
    'filter',
    'filter',
    'find',
    'find',
    'finish',
    'first',
    'focus',
    'focusin',
    'focusout',
    'fx',
    'get',
    'get',
    'getJSON',
    'getScript',
    'globalEval',
    'grep',
    'has',
    'hasClass',
    'hasData',
    'height',
    'hide',
    'holdReady',
    'hover',
    'html',
    'htmlPrefilter',
    'inArray',
    'index',
    'init',
    'innerHeight',
    'innerWidth',
    'insertAfter',
    'insertBefore',
    'is',
    'isArray',
    'isEmptyObject',
    'isFunction',
    'isNumeric',
    'isPlainObject',
    'isWindow',
    'isXMLDoc',
    'keydown',
    'keypress',
    'keyup',
    'last',
    'load',
    'makeArray',
    'map',
    'map',
    'merge',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'next',
    'nextAll',
    'nextUntil',
    'noConflict',
    'nodeName',
    'noop',
    'not',
    'now',
    'odd',
    'off',
    'offset',
    'offsetParent',
    'on',
    'one',
    'outerHeight',
    'outerWidth',
    'param',
    'parent',
    'parents',
    'parentsUntil',
    'parseHTML',
    'parseJSON',
    'parseXML',
    'position',
    'post',
    'prepend',
    'prependTo',
    'prev',
    'prevAll',
    'prevUntil',
    'promise',
    'prop',
    'prop',
    'proxy',
    'push',
    'pushStack',
    'queue',
    'queue',
    'ready',
    'ready',
    'readyException',
    'remove',
    'removeAttr',
    'removeAttr',
    'removeClass',
    'removeData',
    'removeData',
    'removeEvent',
    'removeProp',
    'replaceAll',
    'replaceWith',
    'resize',
    'scroll',
    'scrollLeft',
    'scrollTop',
    'select',
    'serialize',
    'serializeArray',
    'show',
    'siblings',
    'slice',
    'slideDown',
    'slideToggle',
    'slideUp',
    'sort',
    'speed',
    'splice',
    'stop',
    'style',
    'submit',
    'text',
    'text',
    'toArray',
    'toggle',
    'toggleClass',
    'trigger',
    'triggerHandler',
    'trim',
    'type',
    'unbind',
    'undelegate',
    'unique',
    'uniqueSort',
    'unwrap',
    'val',
    'when',
    'width',
    'wrap',
    'wrapAll',
    'wrapInner',
];


let vanillaJsMethodsSource = `
const $ = $utils.default;
$('#highlight').on('click', () => {
    $('.vue').siblings().addClass('highlight');
});
$('#highlight-jquery').on('click', () => {
    $('.jquery').css({
        'font-weight': 'bold',
        'font-style': 'italic',
        color: 'yellow',
    });
});
$('#remove-styles').on('click', () => {
    $('ul li').removeAttr('style').removeClass('highlight');
});
`


function getAST(data) {
    console.log(data);
    return espree.parse(data, {
        ecmaVersion: 2021,
        sourceType: 'module',
        comment: true,
    });
}

const vanillaJaAST = getAST(vanillaJsMethodsSource);

const vanillaJsMethods = [];
    const vanillaJsLineRef = {};
    console.log('vanillaJaAST', vanillaJaAST);
estraverse.traverse(vanillaJaAST, {
    enter(node) {
        console.log('node.type', node);
        if (node.type === 'Identifier') {
            console.log('node.type', node.type);
            if (node.name !== 'constructor') {
                console.log('node.key.name', node.name);
                vanillaJsMethods.push(node.name);
                vanillaJsLineRef[node.name] = {
                    name: node.name,
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
console.log(methodsNameSet);
const alljQMethodsSet = new Set(alljQueryMethods);
const jqueryMethods = [
    ...new Set(
        [...methodsNameSet].filter((method) => alljQMethodsSet.has(method))
    ),
];


console.log('jqueryMethods', jqueryMethods);