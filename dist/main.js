var $fOpAF$espree = require("espree");
var $fOpAF$estraverse = require("estraverse");


      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiredd4a"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiredd4a"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("7qvVn", function(module, exports) {
module.exports = "export class Utils {\n    constructor(selector) {\n        this.elements = Utils.getSelector(selector);\n        this.element = this.get(0);\n        return this;\n    }\n\n    /* $$ Template START $$ */\n\n    each(func) {\n        if (!this.elements.length) {\n            return this;\n        }\n        this.elements.forEach((el, index) => {\n            func.call(el, el, index);\n        });\n        return this;\n    }\n\n    prev() {\n        if (!this.element) {\n            return this;\n        }\n        return new Utils(this.element.previousElementSibling);\n    }\n\n    next() {\n        if (!this.element) {\n            return this;\n        }\n        return new Utils(this.element.nextElementSibling);\n    }\n\n    prevAll(filter) {\n        if (!this.element) {\n            return this;\n        }\n        const sibs = [];\n        while ((this.element = this.element.previousSibling)) {\n            if (this.element.nodeType === 3) {\n                continue; // ignore text nodes\n            }\n            if (!filter || filter(this.element)) sibs.push(this.element);\n        }\n        return new Utils(sibs);\n    }\n\n    nextAll(filter) {\n        if (!this.element) {\n            return this;\n        }\n        const sibs = [];\n        let nextElem = this.element.parentNode.firstChild;\n        do {\n            if (nextElem.nodeType === 3) continue; // ignore text nodes\n            if (nextElem === this.element) continue; // ignore this.element of target\n            if (nextElem === this.element.nextElementSibling) {\n                if (!filter || filter(this.element)) {\n                    sibs.push(nextElem);\n                    this.element = nextElem;\n                }\n            }\n        } while ((nextElem = nextElem.nextSibling));\n        return new Utils(sibs);\n    }\n\n    closest(selector) {\n        if (!this.element) {\n            return this;\n        }\n        const matchesSelector =\n            this.element.matches ||\n            this.element.webkitMatchesSelector ||\n            this.element.mozMatchesSelector ||\n            this.element.msMatchesSelector;\n\n        while (this.element) {\n            if (matchesSelector.call(this.element, selector)) {\n                return new Utils(this.element);\n            }\n            this.element = this.element.parentElement;\n        }\n        return this;\n    }\n\n    parentsUntil(selector, filter) {\n        if (!this.element) {\n            return this;\n        }\n        const result = [];\n        const matchesSelector =\n            this.element.matches ||\n            this.element.webkitMatchesSelector ||\n            this.element.mozMatchesSelector ||\n            this.element.msMatchesSelector;\n\n        // match start from parent\n        let el = this.element.parentElement;\n        while (el && !matchesSelector.call(el, selector)) {\n            if (!filter) {\n                result.push(el);\n            } else if (matchesSelector.call(el, filter)) {\n                result.push(el);\n            }\n            el = el.parentElement;\n        }\n        return new Utils(result);\n    }\n\n    val(value) {\n        if (!this.element) {\n            return '';\n        }\n        if (value === undefined) {\n            return this.element.value;\n        }\n        this.element.value = value;\n    }\n\n    attr(name, value) {\n        if (value === undefined) {\n            if (!this.element) {\n                return '';\n            }\n            return this.element.getAttribute(name);\n        }\n        this.each((el) => {\n            el.setAttribute(name, value);\n        });\n        return this;\n    }\n\n    removeAttr(attributes) {\n        const attrs = attributes.split(' ');\n        this.each((el) => {\n            attrs.forEach((attr) => el.removeAttribute(attr));\n        });\n        return this;\n    }\n\n    hasAttribute(attribute) {\n        if (!this.element) {\n            return false;\n        }\n        return this.element.hasAttribute(attribute);\n    }\n\n    data(name, value) {\n        return this.attr('data-'+name, value);\n    }\n\n    css(css, value) {\n        if (value !== undefined) {\n            this.each((el) => {\n                Utils.setCss(el, css, value);\n            });\n            return this;\n        }\n        if (typeof css === 'object') {\n            for (const property in css) {\n                if (Object.prototype.hasOwnProperty.call(css, property)) {\n                    this.each((el) => {\n                        Utils.setCss(el, property, css[property]);\n                    });\n                }\n            }\n            return this;\n        }\n        const cssProp = Utils.camelCase(css);\n        const property = Utils.styleSupport(cssProp);\n        return getComputedStyle(this.element)[property];\n    }\n\n    addClass(classNames = '') {\n        this.each((el) => {\n            // IE doesn't support multiple arguments\n            classNames.split(' ').forEach((className) => {\n                el.classList.add(className);\n            });\n        });\n        return this;\n    }\n\n    removeClass(classNames) {\n        this.each((el) => {\n            // IE doesn't support multiple arguments\n            classNames.split(' ').forEach((className) => {\n                el.classList.remove(className);\n            });\n        });\n        return this;\n    }\n\n    hasClass(className) {\n        if (!this.element) {\n            return false;\n        }\n        return this.element.classList.contains(className);\n    }\n\n    toggleClass(className) {\n        if (!this.element) {\n            return this;\n        }\n        this.element.classList.toggle(className);\n    }\n\n    find(selector) {\n        return new Utils(Utils.getSelector(selector, this.element));\n    }\n\n    first() {\n        return new Utils(this.elements[0]);\n    }\n\n    eq(index) {\n        return new Utils(this.elements[index]);\n    }\n\n    parent() {\n        return new Utils(this.element.parentElement);\n    }\n\n    offsetParent() {\n        if (!this.element) {\n            return this;\n        }\n        return new Utils(this.element.offsetParent);\n    }\n\n    children() {\n        return new Utils(this.element.children);\n    }\n\n    get(index) {\n        if (index !== undefined) {\n            return this.elements[index];\n        }\n        return this.elements;\n    }\n\n    siblings() {\n        if (!this.element) {\n            return this;\n        }\n        const elements = Array.prototype.filter.call(\n            this.element.parentNode.children,\n            (child) => child !== this.element\n        );\n        return new Utils(elements);\n    }\n\n    index() {\n        if (!this.element) return -1;\n        let i = 0;\n        do {\n            i++;\n        } while ((this.element = this.element.previousElementSibling));\n        return i;\n    }\n\n    wrap(className) {\n        this.each((el) => {\n            const wrapper = document.createElement('div');\n            wrapper.className = className;\n            el.parentNode.insertBefore(wrapper, el);\n            wrapper.appendChild(el);\n        });\n        return this;\n    }\n\n    unwrap() {\n        this.each((el) => {\n            const elParentNode = el.parentNode;\n\n            if (elParentNode !== document.body) {\n                elParentNode.parentNode.insertBefore(el, elParentNode);\n                elParentNode.parentNode.removeChild(elParentNode);\n            }\n        });\n        return this;\n    }\n\n    on(events, listener) {\n        events.split(' ').forEach((eventName) => {\n            this.each((el) => {\n                const tNEventName = Utils.setEventName(el, eventName);\n                if (!Array.isArray(Utils.eventListeners[tNEventName])) {\n                    Utils.eventListeners[tNEventName] = [];\n                }\n                Utils.eventListeners[tNEventName].push(listener);\n\n                // https://github.com/microsoft/TypeScript/issues/28357\n                if (el) {\n                    el.addEventListener(eventName.split('.')[0], listener);\n                }\n            });\n        });\n\n        return this;\n    }\n\n    one(event, listener) {\n        this.each((el) => {\n            new Utils(el).on(event, () => {\n                new Utils(el).off(event);\n                listener(event);\n            });\n        });\n        return this;\n    }\n\n    off(eventNames) {\n        Object.keys(Utils.eventListeners).forEach((tNEventName) => {\n            const currentEventName = Utils.getEventNameFromId(tNEventName);\n            eventNames.split(' ').forEach((eventName) => {\n                if (Utils.isEventMatched(eventName, currentEventName)) {\n                    this.each((el) => {\n                        if (\n                            Utils.getElementEventName(el, currentEventName) ===\n                            tNEventName\n                        ) {\n                            Utils.eventListeners[tNEventName].forEach(\n                                (listener) => {\n                                    el.removeEventListener(\n                                        currentEventName.split('.')[0],\n                                        listener\n                                    );\n                                }\n                            );\n                            delete Utils.eventListeners[tNEventName];\n                        }\n                    });\n                }\n            });\n        });\n        return this;\n    }\n\n    trigger(event, detail) {\n        if (!this.element) {\n            return this;\n        }\n        const eventName = event.split('.')[0];\n        const isNativeEvent =\n            typeof document.body['on'+eventName] !== 'undefined';\n        if (isNativeEvent) {\n            this.each((el) => {\n                el.dispatchEvent(new Event(eventName));\n            });\n            return this;\n        }\n        const customEvent = new CustomEvent(eventName, {\n            detail: detail || null,\n        });\n        this.each((el) => {\n            el.dispatchEvent(customEvent);\n        });\n        return this;\n    }\n\n    html(html) {\n        if (html === undefined) {\n            if (!this.element) {\n                return '';\n            }\n            return this.element.innerHTML;\n        }\n        this.each((el) => {\n            el.innerHTML = html;\n        });\n        return this;\n    }\n\n    text(text) {\n        if (text === undefined) {\n            if (!this.element) {\n                return '';\n            }\n            return this.element.textContent;\n        }\n        this.each((el) => {\n            el.textContent = text;\n        });\n        return this;\n    }\n\n    hide() {\n        this.each((el) => {\n            el.style.display = 'none';\n        });\n    }\n\n    show() {\n        this.each((el) => {\n            el.style.display = '';\n        });\n    }\n\n    clone() {\n        return new Utils(this.element.cloneNode(true));\n    }\n\n    append(html) {\n        this.each((el) => {\n            if (typeof html === 'string') {\n                el.insertAdjacentHTML('beforeend', html);\n            } else {\n                el.appendChild(html);\n            }\n        });\n        return this;\n    }\n\n    prepend(html) {\n        this.each((el) => {\n            if (typeof html === 'string') {\n                el.insertAdjacentHTML('afterbegin', html);\n            } else {\n                el.insertBefore(html, el.firstChild);\n            }\n        });\n        return this;\n    }\n\n    remove() {\n        this.each((el) => {\n            el.parentNode.removeChild(el);\n        });\n        return this;\n    }\n\n    empty() {\n        this.each((el) => {\n            el.innerHTML = '';\n        });\n        return this;\n    }\n\n    contains(child) {\n        return this.element !== child && this.element.contains(child);\n    }\n\n    is(el) {\n        if (typeof el === 'string') {\n            return (\n                this.element.matches ||\n                this.element.matchesSelector ||\n                this.element.msMatchesSelector ||\n                this.element.mozMatchesSelector ||\n                this.element.webkitMatchesSelector ||\n                this.element.oMatchesSelector\n            ).call(this.element, el);\n        }\n        return this.element === (el.element || el);\n    }\n\n    width() {\n        if (!this.element) {\n            return 0;\n        }\n        const style = window.getComputedStyle(this.element, null);\n        return parseFloat(style.width.replace('px', ''));\n    }\n\n    // Outer Width With Margin if margin is true\n    outerWidth(margin) {\n        if (!this.element) {\n            return 0;\n        }\n        if (margin !== undefined) {\n            let width = this.element.offsetWidth;\n            const style = window.getComputedStyle(this.element);\n\n            width +=\n                parseInt(style.marginLeft, 10) +\n                parseInt(style.marginRight, 10);\n            return width;\n        }\n        return this.element.offsetWidth;\n    }\n\n    height() {\n        if (!this.element) {\n            return 0;\n        }\n        const style = window.getComputedStyle(this.element, null);\n        return parseFloat(style.height.replace('px', ''));\n    }\n\n    outerHeight(margin) {\n        if (!this.element) {\n            return 0;\n        }\n        if (margin !== undefined) {\n            let height = this.element.offsetHeight;\n            const style = getComputedStyle(this.element);\n\n            height +=\n                parseInt(style.marginTop, 10) +\n                parseInt(style.marginBottom, 10);\n            return height;\n        }\n        return this.element.offsetHeight;\n    }\n\n    offset() {\n        if (!this.element) {\n            return {\n                left: 0,\n                top: 0,\n            };\n        }\n        const box = this.element.getBoundingClientRect();\n        return {\n            top:\n                box.top +\n                window.pageYOffset -\n                document.documentElement.clientTop,\n            left:\n                box.left +\n                window.pageXOffset -\n                document.documentElement.clientLeft,\n        };\n    }\n\n    position() {\n        return {\n            left: this.element.offsetLeft,\n            top: this.element.offsetTop,\n        };\n    }\n\n    static generateUUID() {\n        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {\n            // eslint-disable-next-line no-bitwise\n            const r = (Math.random() * 16) | 0;\n            // eslint-disable-next-line no-bitwise\n            const v = c === 'x' ? r : (r & 0x3) | 0x8;\n            return v.toString(16);\n        });\n    }\n\n    static setEventName(el, eventName) {\n        // Need to verify https://stackoverflow.com/questions/1915341/whats-wrong-with-adding-properties-to-dom-element-objects\n        const elementUUId = el.eventEmitterUUID;\n        const uuid = elementUUId || Utils.generateUUID();\n        // eslint-disable-next-line no-param-reassign\n        el.eventEmitterUUID = uuid;\n        return Utils.getEventName(eventName, uuid);\n    }\n\n    static getElementEventName(el, eventName) {\n        const elementUUId = el.eventEmitterUUID;\n        /* istanbul ignore next */\n        const uuid = elementUUId || Utils.generateUUID();\n        // eslint-disable-next-line no-param-reassign\n        el.eventEmitterUUID = uuid;\n        return Utils.getEventName(eventName, uuid);\n    }\n\n    static getEventName(eventName, uuid) {\n        return eventName+'__EVENT_EMITTER__'+uuid;\n    }\n\n    static getEventNameFromId(eventName) {\n        return eventName.split('__EVENT_EMITTER__')[0];\n    }\n\n    static getSelector(selector, context) {\n        if (selector && typeof selector !== 'string') {\n            if (selector.length !== undefined) {\n                return selector;\n            }\n            return [selector];\n        }\n        context = context || document;\n\n        // For performance reasons, use getElementById\n        // eslint-disable-next-line no-control-regex\n        const idRegex = /^#(?:[\\w-]|\\\\.|[^\\x00-\\xa0])*$/;\n        if (idRegex.test(selector)) {\n            const el = document.getElementById(selector.substring(1));\n            return el ? [el] : [];\n        }\n        return [].slice.call(context.querySelectorAll(selector) || []);\n    }\n\n    static styleSupport(prop) {\n        let vendorProp;\n        let supportedProp;\n        const capProp = prop.charAt(0).toUpperCase() + prop.slice(1);\n        const prefixes = ['Moz', 'Webkit', 'O', 'ms'];\n        let div = document.createElement('div');\n\n        if (prop in div.style) {\n            supportedProp = prop;\n        } else {\n            for (let i = 0; i < prefixes.length; i++) {\n                vendorProp = prefixes[i] + capProp;\n                if (vendorProp in div.style) {\n                    supportedProp = vendorProp;\n                    break;\n                }\n            }\n        }\n\n        div = null;\n        return supportedProp;\n    }\n\n    // https://gist.github.com/cballou/4007063\n    static setCss(el, prop, value) {\n        // prettier-ignore\n        let cssProperty = Utils.camelCase(prop);\n        cssProperty = Utils.styleSupport(cssProperty);\n        el.style[cssProperty] = value;\n    }\n\n    static camelCase(text) {\n        return text.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());\n    }\n\n    static isEventMatched(event, eventName) {\n        const eventNamespace = eventName.split('.');\n        return event\n            .split('.')\n            .filter((e) => e)\n            .every((e) => eventNamespace.indexOf(e) !== -1);\n    }\n\n    /* $$ Template END $$ */\n}\n\nUtils.eventListeners = {};\n\nexport default function $utils(selector) {\n    return new Utils(selector);\n}\n";

});

"use strict";

var $7016d4a13d3baf19$var$_vanillaJsMethods = $7016d4a13d3baf19$var$_interopRequireDefault((parcelRequire("7qvVn")));
function $7016d4a13d3baf19$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var $4559ecf940edc78d$exports = {};
"use strict";


var $1998f2a2e66e01a6$exports = {};
"use strict";
// This file is autogenerated. Do not modify manually
$1998f2a2e66e01a6$exports = [
    "add",
    "addBack",
    "addClass",
    "after",
    "ajax",
    "ajaxComplete",
    "ajaxError",
    "ajaxPrefilter",
    "ajaxSend",
    "ajaxSetup",
    "ajaxStart",
    "ajaxStop",
    "ajaxSuccess",
    "ajaxTransport",
    "animate",
    "append",
    "appendTo",
    "attr",
    "attr",
    "before",
    "bind",
    "blur",
    "camelCase",
    "change",
    "children",
    "cleanData",
    "clearQueue",
    "click",
    "clone",
    "clone",
    "closest",
    "constructor",
    "contains",
    "contents",
    "contextmenu",
    "css",
    "css",
    "data",
    "data",
    "dblclick",
    "delay",
    "delegate",
    "dequeue",
    "dequeue",
    "detach",
    "each",
    "each",
    "empty",
    "end",
    "eq",
    "error",
    "escapeSelector",
    "even",
    "extend",
    "extend",
    "fadeIn",
    "fadeOut",
    "fadeTo",
    "fadeToggle",
    "filter",
    "filter",
    "find",
    "find",
    "finish",
    "first",
    "focus",
    "focusin",
    "focusout",
    "fx",
    "get",
    "get",
    "getJSON",
    "getScript",
    "globalEval",
    "grep",
    "has",
    "hasClass",
    "hasData",
    "height",
    "hide",
    "holdReady",
    "hover",
    "html",
    "htmlPrefilter",
    "inArray",
    "index",
    "init",
    "innerHeight",
    "innerWidth",
    "insertAfter",
    "insertBefore",
    "is",
    "isArray",
    "isEmptyObject",
    "isFunction",
    "isNumeric",
    "isPlainObject",
    "isWindow",
    "isXMLDoc",
    "keydown",
    "keypress",
    "keyup",
    "last",
    "load",
    "makeArray",
    "map",
    "map",
    "merge",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "next",
    "nextAll",
    "nextUntil",
    "noConflict",
    "nodeName",
    "noop",
    "not",
    "now",
    "odd",
    "off",
    "offset",
    "offsetParent",
    "on",
    "one",
    "outerHeight",
    "outerWidth",
    "param",
    "parent",
    "parents",
    "parentsUntil",
    "parseHTML",
    "parseJSON",
    "parseXML",
    "position",
    "post",
    "prepend",
    "prependTo",
    "prev",
    "prevAll",
    "prevUntil",
    "promise",
    "prop",
    "prop",
    "proxy",
    "push",
    "pushStack",
    "queue",
    "queue",
    "ready",
    "ready",
    "readyException",
    "remove",
    "removeAttr",
    "removeAttr",
    "removeClass",
    "removeData",
    "removeData",
    "removeEvent",
    "removeProp",
    "replaceAll",
    "replaceWith",
    "resize",
    "scroll",
    "scrollLeft",
    "scrollTop",
    "select",
    "serialize",
    "serializeArray",
    "show",
    "siblings",
    "slice",
    "slideDown",
    "slideToggle",
    "slideUp",
    "sort",
    "speed",
    "splice",
    "stop",
    "style",
    "submit",
    "text",
    "text",
    "toArray",
    "toggle",
    "toggleClass",
    "trigger",
    "triggerHandler",
    "trim",
    "type",
    "unbind",
    "undelegate",
    "unique",
    "uniqueSort",
    "unwrap",
    "val",
    "when",
    "width",
    "wrap",
    "wrapAll",
    "wrapInner"
];


function $4559ecf940edc78d$var$traverse(node) {
    while(node)switch(node.type){
        case "CallExpression":
            node = node.callee;
            break;
        case "MemberExpression":
            if (node.object.type === "ThisExpression") return node.property;
            node = node.object;
            break;
        case "Identifier":
            return node;
        default:
            return null;
    }
} // Detect jQuery methods
// @tod Add an option to pass regex for finding jQuery methods
function $4559ecf940edc78d$var$isjQuery(node) {
    const id = $4559ecf940edc78d$var$traverse(node);
    return id && new RegExp("^\\$.").test(id && id.name) || [
        "$",
        "jQuery"
    ].includes(id && id.name);
}
function $4559ecf940edc78d$var$getAST(data) {
    return $fOpAF$espree.parse(data, {
        ecmaVersion: 2021,
        sourceType: "module",
        comment: true
    });
}
async function $4559ecf940edc78d$var$getDependedMethods(methodsFileData, baseMethods, generatedMethods, lineRef, outputStart, outputEnd) {
    const outputAst = $4559ecf940edc78d$var$getAST(outputStart + baseMethods + outputEnd);
    const dependedMethods = [];
    $fOpAF$estraverse.traverse(outputAst, {
        enter (node) {
            if (node.callee && node.callee.type === "MemberExpression") {
                const methodName = node.callee.property.name;
                if ((node.callee.object.type === "ThisExpression" || node.callee.object.type === "Identifier") && generatedMethods.indexOf(methodName) < 0) dependedMethods.push(node.callee.property.name);
            }
        }
    });
    const uniqueDependedMethods = [
        ...new Set(dependedMethods)
    ];
    let methodsData = "";
    uniqueDependedMethods.forEach((method)=>{
        if (lineRef[method] && lineRef[method].range) methodsData += methodsFileData.substring(lineRef[method].range.start, lineRef[method].range.end);
    });
    let allMethods = [
        ...generatedMethods,
        ...uniqueDependedMethods
    ];
    if (uniqueDependedMethods.length) {
        const remainingMethodData = await $4559ecf940edc78d$var$getDependedMethods(methodsFileData, baseMethods + methodsData, allMethods, lineRef, outputStart, outputEnd);
        methodsData += remainingMethodData.methodsData;
        allMethods = [
            ...allMethods,
            remainingMethodData.allMethods
        ];
    }
    return {
        methodsData: methodsData,
        allMethods: allMethods
    };
}
const $4559ecf940edc78d$var$getTemplateData = (data, astMethods)=>{
    const templateLines = {
        start: 0,
        end: 0
    };
    astMethods.comments.forEach((comment)=>{
        if (comment.type === "Block") {
            if (comment.value.includes("$$ Template START $$")) templateLines.start = comment.start;
            else if (comment.value.includes("$$ Template END $$")) templateLines.end = comment.end;
        }
    });
    const outputStart = data.substring(0, templateLines.start);
    const outputEnd = data.substring(templateLines.end, data.length);
    return {
        outputStart: outputStart,
        outputEnd: outputEnd
    };
};
async function $4559ecf940edc78d$var$generateAlternativeMethods(methodsToGenerate, methodsFileData) {
    const lineRef = {};
    const astMethods = $4559ecf940edc78d$var$getAST(methodsFileData);
    $fOpAF$estraverse.traverse(astMethods, {
        enter (node) {
            if (node.type === "MethodDefinition") {
                lineRef[node.key.name] = {
                    name: node.key.name,
                    range: {
                        start: node.start,
                        end: node.end
                    }
                };
                return $fOpAF$estraverse.VisitorOption.Skip;
            }
        }
    });
    const remainingMethods = [];
    let baseMethods = "";
    methodsToGenerate.forEach((method)=>{
        if (lineRef[method]) baseMethods += methodsFileData.substring(lineRef[method].range.start, lineRef[method].range.end);
        else remainingMethods.push(method);
    });
    const { outputStart: outputStart, outputEnd: outputEnd } = $4559ecf940edc78d$var$getTemplateData(methodsFileData, astMethods);
    const remainingMethodData = await $4559ecf940edc78d$var$getDependedMethods(methodsFileData, baseMethods, methodsToGenerate, lineRef, outputStart, outputEnd);
    return {
        data: outputStart + baseMethods + remainingMethodData.methodsData + outputEnd,
        remainingMethods: remainingMethods
    };
}
async function $4559ecf940edc78d$var$getJQueryMethodsFromSource(data) {
    const ast = $4559ecf940edc78d$var$getAST(data);
    const jQFns = [];
    $fOpAF$estraverse.traverse(ast, {
        enter (node) {
            if (node.callee && node.callee.type === "MemberExpression") {
                if ($4559ecf940edc78d$var$isjQuery(node)) jQFns.push(node.callee.property.name);
            }
        }
    });
    const jQFnsSet = new Set(jQFns);
    const alljQMethodsSet = new Set($1998f2a2e66e01a6$exports);
    const intersection = new Set([
        ...jQFnsSet
    ].filter((method)=>alljQMethodsSet.has(method)));
    return [
        ...intersection
    ];
}
$4559ecf940edc78d$exports = {
    traverse: $4559ecf940edc78d$var$traverse,
    isjQuery: $4559ecf940edc78d$var$isjQuery,
    getAST: $4559ecf940edc78d$var$getAST,
    generateAlternativeMethods: $4559ecf940edc78d$var$generateAlternativeMethods,
    getJQueryMethodsFromSource: $4559ecf940edc78d$var$getJQueryMethodsFromSource
};


async function $7016d4a13d3baf19$var$plugin(source) {
    const methods = await $4559ecf940edc78d$exports.getJQueryMethodsFromSource(source);
    const generatedMethods = await $4559ecf940edc78d$exports.generateAlternativeMethods(methods, $7016d4a13d3baf19$var$_vanillaJsMethods.default); // eslint-disable-next-line no-undef
    const formattedOutput = await prettier.format(generatedMethods.data, {
        parser: "babel",
        tabWidth: 4,
        // eslint-disable-next-line no-undef
        plugins: prettierPlugins,
        singleQuote: true
    });
    return {
        formattedOutput: formattedOutput,
        methodsFound: methods,
        remainingMethods: generatedMethods.remainingMethods
    };
}
window.ReplaceJquery = $7016d4a13d3baf19$var$plugin;


//# sourceMappingURL=main.js.map
