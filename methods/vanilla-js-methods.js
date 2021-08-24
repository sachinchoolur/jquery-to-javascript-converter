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
    /* $$ Template END $$ */
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}
