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
