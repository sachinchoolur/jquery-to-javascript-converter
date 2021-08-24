export class Utils {
    constructor(selector) {
        this.elements = Utils.getSelector(selector);
        this.element = this.getFirstEl();
        return this;
    }

    /* $$ Template START $$ */

    getFirstEl() {
        if (this.elements && this.elements.length !== undefined) {
            return this.elements[0];
        }
        return this.elements;
    }

    each(func) {
        if (!this.elements) {
            return this;
        }
        if (this.elements.length !== undefined) {
            [].slice.call(this.elements).forEach((el, index) => {
                func.call(el, el, index);
            });
        } else {
            func.call(this.element, this.element, 0);
        }
        return this;
    }

    prev() {
        if (!this.element) {
            return this;
        }
        return new Utils(this.element.previousElementSibling);
    }

    next() {
        if (!this.element) {
            return this;
        }
        return new Utils(this.element.nextElementSibling);
    }

    prevAll(filter) {
        if (!this.element) {
            return this;
        }
        const sibs = [];
        while ((this.element = this.element.previousSibling)) {
            if (this.element.nodeType === 3) {
                continue; // ignore text nodes
            }
            if (!filter || filter(this.element)) sibs.push(this.element);
        }
        return new Utils(sibs);
    }

    nextAll(filter) {
        if (!this.element) {
            return this;
        }
        const sibs = [];
        let nextElem = this.element.parentNode.firstChild;
        do {
            if (nextElem.nodeType === 3) continue; // ignore text nodes
            if (nextElem === this.element) continue; // ignore this.element of target
            if (nextElem === this.element.nextElementSibling) {
                if (!filter || filter(this.element)) {
                    sibs.push(nextElem);
                    this.element = nextElem;
                }
            }
        } while ((nextElem = nextElem.nextSibling));
        return new Utils(sibs);
    }

    closest(selector) {
        if (!this.element) {
            return this;
        }
        const matchesSelector =
            this.element.matches ||
            this.element.webkitMatchesSelector ||
            this.element.mozMatchesSelector ||
            this.element.msMatchesSelector;

        while (this.element) {
            if (matchesSelector.call(this.element, selector)) {
                return new Utils(this.element);
            }
            this.element = this.element.parentElement;
        }
        return this;
    }

    parentsUntil(selector, filter) {
        if (!this.element) {
            return this;
        }
        const result = [];
        const matchesSelector =
            this.element.matches ||
            this.element.webkitMatchesSelector ||
            this.element.mozMatchesSelector ||
            this.element.msMatchesSelector;

        // match start from parent
        let el = this.element.parentElement;
        while (el && !matchesSelector.call(el, selector)) {
            if (!filter) {
                result.push(el);
            } else if (matchesSelector.call(el, filter)) {
                result.push(el);
            }
            el = el.parentElement;
        }
        return new Utils(result);
    }

    val(value) {
        if (!this.element) {
            return '';
        }
        if (value === undefined) {
            return this.element.value;
        }
        this.element.value = value;
    }

    attr(name, value) {
        if (value === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.getAttribute(name);
        }
        this.each((el) => {
            el.setAttribute(name, value);
        });
        return this;
    }

    removeAttr(attributes) {
        const attrs = attributes.split(' ');
        this.each((el) => {
            attrs.forEach((attr) => el.removeAttribute(attr));
        });
        return this;
    }

    hasAttribute(attribute) {
        if (!this.element) {
            return false;
        }
        return this.element.hasAttribute(attribute);
    }

    data(name, value) {
        return this.attr(`data-${name}`, value);
    }

    css(css, value) {
        if (value !== undefined) {
            this.each((el) => {
                Utils.setCss(el, css, value);
            });
            return this;
        }
        if (typeof css === 'object') {
            for (const property in css) {
                if (Object.prototype.hasOwnProperty.call(css, property)) {
                    this.each((el) => {
                        Utils.setCss(el, property, css[property]);
                    });
                }
            }
            return this;
        }
        const cssProp = Utils.camelCase(css);
        const property = Utils.styleSupport(cssProp);
        return getComputedStyle(this.element)[property];
    }

    addClass(classNames = '') {
        this.each((el) => {
            // IE doesn't support multiple arguments
            classNames.split(' ').forEach((className) => {
                el.classList.add(className);
            });
        });
        return this;
    }

    removeClass(classNames) {
        this.each((el) => {
            // IE doesn't support multiple arguments
            classNames.split(' ').forEach((className) => {
                el.classList.remove(className);
            });
        });
        return this;
    }
    static getIdFromSelector(selector) {
        const selectors = selector.split(' ');
        const lastSelector = selectors[selectors.length - 1];
        const fl = lastSelector.substring(0, 1);
        if (fl === '#') {
            return lastSelector.substring(1);
        }
    }

    static getSelector(selector, context) {
        if (typeof selector !== 'string') {
            return selector;
        }
        context = context || document;

        // For performance reasons, use getElementById
        const id = Utils.getIdFromSelector(selector);
        if (id) {
            return document.getElementById(id);
        }
        return context.querySelectorAll(selector);
    }

    static styleSupport(prop) {
        let vendorProp;
        let supportedProp;
        const capProp = prop.charAt(0).toUpperCase() + prop.slice(1);
        const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        let div = document.createElement('div');

        if (prop in div.style) {
            supportedProp = prop;
        } else {
            for (let i = 0; i < prefixes.length; i++) {
                vendorProp = prefixes[i] + capProp;
                if (vendorProp in div.style) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }

        div = null;
        return supportedProp;
    }

    // https://gist.github.com/cballou/4007063
    static setCss(el, prop, value) {
        // prettier-ignore
        let cssProperty = Utils.camelCase(prop);
        cssProperty = Utils.styleSupport(cssProperty);
        el.style[cssProperty] = value;
    }

    static camelCase(text) {
        return text.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
    }
    /* $$ Template END $$ */
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}
