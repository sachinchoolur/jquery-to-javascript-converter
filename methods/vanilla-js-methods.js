export class Utils {
    constructor(selector) {
        this.elements = Utils.getSelector(selector);
        this.element = this.get(0);
        return this;
    }

    /* $$ Template START $$ */

    each(func) {
        if (!this.elements.length) {
            return this;
        }
        this.elements.forEach((el, index) => {
            func.call(el, el, index);
        });
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
        return this.attr('data-'+name, value);
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

    hasClass(className) {
        if (!this.element) {
            return false;
        }
        return this.element.classList.contains(className);
    }

    toggleClass(className) {
        if (!this.element) {
            return this;
        }
        this.element.classList.toggle(className);
    }

    find(selector) {
        return new Utils(Utils.getSelector(selector, this.element));
    }

    first() {
        return new Utils(this.elements[0]);
    }

    eq(index) {
        return new Utils(this.elements[index]);
    }

    parent() {
        return new Utils(this.element.parentElement);
    }

    offsetParent() {
        if (!this.element) {
            return this;
        }
        return new Utils(this.element.offsetParent);
    }

    children() {
        return new Utils(this.element.children);
    }

    get(index) {
        if (index !== undefined) {
            return this.elements[index];
        }
        return this.elements;
    }

    siblings() {
        if (!this.element) {
            return this;
        }
        const elements = Array.prototype.filter.call(
            this.element.parentNode.children,
            (child) => child !== this.element
        );
        return new Utils(elements);
    }

    index() {
        if (!this.element) return -1;
        let i = 0;
        do {
            i++;
        } while ((this.element = this.element.previousElementSibling));
        return i;
    }

    wrap(className) {
        this.each((el) => {
            const wrapper = document.createElement('div');
            wrapper.className = className;
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
        });
        return this;
    }

    unwrap() {
        this.each((el) => {
            const elParentNode = el.parentNode;

            if (elParentNode !== document.body) {
                elParentNode.parentNode.insertBefore(el, elParentNode);
                elParentNode.parentNode.removeChild(elParentNode);
            }
        });
        return this;
    }

    on(events, listener) {
        events.split(' ').forEach((eventName) => {
            this.each((el) => {
                const tNEventName = Utils.setEventName(el, eventName);
                if (!Array.isArray(Utils.eventListeners[tNEventName])) {
                    Utils.eventListeners[tNEventName] = [];
                }
                Utils.eventListeners[tNEventName].push(listener);

                // https://github.com/microsoft/TypeScript/issues/28357
                if (el) {
                    el.addEventListener(eventName.split('.')[0], listener);
                }
            });
        });

        return this;
    }

    one(event, listener) {
        this.each((el) => {
            new Utils(el).on(event, () => {
                new Utils(el).off(event);
                listener(event);
            });
        });
        return this;
    }

    off(eventNames) {
        Object.keys(Utils.eventListeners).forEach((tNEventName) => {
            const currentEventName = Utils.getEventNameFromId(tNEventName);
            eventNames.split(' ').forEach((eventName) => {
                if (Utils.isEventMatched(eventName, currentEventName)) {
                    this.each((el) => {
                        if (
                            Utils.getElementEventName(el, currentEventName) ===
                            tNEventName
                        ) {
                            Utils.eventListeners[tNEventName].forEach(
                                (listener) => {
                                    el.removeEventListener(
                                        currentEventName.split('.')[0],
                                        listener
                                    );
                                }
                            );
                            delete Utils.eventListeners[tNEventName];
                        }
                    });
                }
            });
        });
        return this;
    }

    trigger(event, detail) {
        if (!this.element) {
            return this;
        }
        const eventName = event.split('.')[0];
        const isNativeEvent =
            typeof document.body['on'+eventName] !== 'undefined';
        if (isNativeEvent) {
            this.each((el) => {
                el.dispatchEvent(new Event(eventName));
            });
            return this;
        }
        const customEvent = new CustomEvent(eventName, {
            detail: detail || null,
        });
        this.each((el) => {
            el.dispatchEvent(customEvent);
        });
        return this;
    }

    html(html) {
        if (html === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.innerHTML;
        }
        this.each((el) => {
            el.innerHTML = html;
        });
        return this;
    }

    text(text) {
        if (text === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.textContent;
        }
        this.each((el) => {
            el.textContent = text;
        });
        return this;
    }

    hide() {
        this.each((el) => {
            el.style.display = 'none';
        });
    }

    show() {
        this.each((el) => {
            el.style.display = '';
        });
    }

    clone() {
        return new Utils(this.element.cloneNode(true));
    }

    append(html) {
        this.each((el) => {
            if (typeof html === 'string') {
                el.insertAdjacentHTML('beforeend', html);
            } else {
                el.appendChild(html);
            }
        });
        return this;
    }

    prepend(html) {
        this.each((el) => {
            if (typeof html === 'string') {
                el.insertAdjacentHTML('afterbegin', html);
            } else {
                el.insertBefore(html, el.firstChild);
            }
        });
        return this;
    }

    remove() {
        this.each((el) => {
            el.parentNode.removeChild(el);
        });
        return this;
    }

    empty() {
        this.each((el) => {
            el.innerHTML = '';
        });
        return this;
    }

    contains(child) {
        return this.element !== child && this.element.contains(child);
    }

    is(el) {
        if (typeof el === 'string') {
            return (
                this.element.matches ||
                this.element.matchesSelector ||
                this.element.msMatchesSelector ||
                this.element.mozMatchesSelector ||
                this.element.webkitMatchesSelector ||
                this.element.oMatchesSelector
            ).call(this.element, el);
        }
        return this.element === (el.element || el);
    }

    width() {
        if (!this.element) {
            return 0;
        }
        const style = window.getComputedStyle(this.element, null);
        return parseFloat(style.width.replace('px', ''));
    }

    // Outer Width With Margin if margin is true
    outerWidth(margin) {
        if (!this.element) {
            return 0;
        }
        if (margin !== undefined) {
            let width = this.element.offsetWidth;
            const style = window.getComputedStyle(this.element);

            width +=
                parseInt(style.marginLeft, 10) +
                parseInt(style.marginRight, 10);
            return width;
        }
        return this.element.offsetWidth;
    }

    height() {
        if (!this.element) {
            return 0;
        }
        const style = window.getComputedStyle(this.element, null);
        return parseFloat(style.height.replace('px', ''));
    }

    outerHeight(margin) {
        if (!this.element) {
            return 0;
        }
        if (margin !== undefined) {
            let height = this.element.offsetHeight;
            const style = getComputedStyle(this.element);

            height +=
                parseInt(style.marginTop, 10) +
                parseInt(style.marginBottom, 10);
            return height;
        }
        return this.element.offsetHeight;
    }

    offset() {
        if (!this.element) {
            return {
                left: 0,
                top: 0,
            };
        }
        const box = this.element.getBoundingClientRect();
        return {
            top:
                box.top +
                window.pageYOffset -
                document.documentElement.clientTop,
            left:
                box.left +
                window.pageXOffset -
                document.documentElement.clientLeft,
        };
    }

    position() {
        return {
            left: this.element.offsetLeft,
            top: this.element.offsetTop,
        };
    }

    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // eslint-disable-next-line no-bitwise
            const r = (Math.random() * 16) | 0;
            // eslint-disable-next-line no-bitwise
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static setEventName(el, eventName) {
        // Need to verify https://stackoverflow.com/questions/1915341/whats-wrong-with-adding-properties-to-dom-element-objects
        const elementUUId = el.eventEmitterUUID;
        const uuid = elementUUId || Utils.generateUUID();
        // eslint-disable-next-line no-param-reassign
        el.eventEmitterUUID = uuid;
        return Utils.getEventName(eventName, uuid);
    }

    static getElementEventName(el, eventName) {
        const elementUUId = el.eventEmitterUUID;
        /* istanbul ignore next */
        const uuid = elementUUId || Utils.generateUUID();
        // eslint-disable-next-line no-param-reassign
        el.eventEmitterUUID = uuid;
        return Utils.getEventName(eventName, uuid);
    }

    static getEventName(eventName, uuid) {
        return eventName+'__EVENT_EMITTER__'+uuid;
    }

    static getEventNameFromId(eventName) {
        return eventName.split('__EVENT_EMITTER__')[0];
    }

    static getSelector(selector, context) {
        if (selector && typeof selector !== 'string') {
            if (selector.length !== undefined) {
                return selector;
            }
            return [selector];
        }
        context = context || document;

        // For performance reasons, use getElementById
        // eslint-disable-next-line no-control-regex
        const idRegex = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
        if (idRegex.test(selector)) {
            const el = document.getElementById(selector.substring(1));
            return el ? [el] : [];
        }
        return [].slice.call(context.querySelectorAll(selector) || []);
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

    static isEventMatched(event, eventName) {
        const eventNamespace = eventName.split('.');
        return event
            .split('.')
            .filter((e) => e)
            .every((e) => eventNamespace.indexOf(e) !== -1);
    }

    /* $$ Template END $$ */
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}
