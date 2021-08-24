export class Utils {
    constructor(selector) {
        this.elements = Utils.getSelector(selector);
        this.element = this.getFirstEl();
        return this;
    }

    /* $$ Template START $$ */

    /* $$ Template END $$ */
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}
