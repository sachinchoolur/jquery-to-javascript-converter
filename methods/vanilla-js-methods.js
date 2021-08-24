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
