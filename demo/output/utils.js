(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.$utils = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  class Utils {
    constructor(selector) {
      this.selector = this._getSelector(selector);
      this.firstElement = this._getFirstEl();
      return this;
    }
    /*$$ Template START $$*/


    _getSelector(selector, context = document) {
      if (typeof selector !== 'string') {
        return selector;
      }

      context = context || document;
      const selectors = selector.split(' ');
      const fl = selectors[selectors.length - 1].substring(0, 1);

      if (fl === '#') {
        return context.querySelector(selector);
      } else {
        return context.querySelectorAll(selector);
      }
    }

    _styleSupport(prop) {
      var vendorProp,
          supportedProp,
          capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          prefixes = ['Moz', 'Webkit', 'O', 'ms'],
          div = document.createElement('div');

      if (prop in div.style) {
        supportedProp = prop;
      } else {
        for (var i = 0; i < prefixes.length; i++) {
          vendorProp = prefixes[i] + capProp;

          if (vendorProp in div.style) {
            supportedProp = vendorProp;
            break;
          }
        }
      }

      div = null;
      return supportedProp;
    } //https://gist.github.com/cballou/4007063


    _setCss(el, prop, value) {
      // prettier-ignore
      let cssProperty = this._camelCase(prop);

      cssProperty = this._styleSupport(cssProperty);
      el.style[cssProperty] = value;
    }

    _camelCase(text) {
      return text.replace(/-([a-z])/gi, function (s, group1) {
        return group1.toUpperCase();
      });
    }

    _getFirstEl() {
      if (this.selector && this.selector.length !== undefined) {
        return this.selector[0];
      } else {
        return this.selector;
      }
    }

    each(func) {
      if (!this.selector) {
        return this;
      }

      if (this.selector.length !== undefined) {
        for (let i = 0; i < this.selector.length; i++) {
          const el = this.selector[i];
          func.call(el, el, i);
        }
      } else {
        func.call(this.selector, this.selector, 0);
      }

      return this;
    }

    prev() {
      if (!this.firstElement) {
        return this;
      }

      return $utils(this.firstElement.previousElementSibling);
    }

    next() {
      if (!this.firstElement) {
        return this;
      }

      return $utils(this.firstElement.nextElementSibling);
    }

    prevAll(filter) {
      if (!this.firstElement) {
        return this;
      }

      var sibs = [];

      while (this.firstElement = this.firstElement.previousSibling) {
        if (this.firstElement.nodeType === 3) continue; // ignore text nodes

        if (!filter || filter(this.firstElement)) sibs.push(this.firstElement);
      }

      return $utils(sibs);
    }

    nextAll(filter) {
      if (!this.firstElement) {
        return this;
      }

      var sibs = [];
      var nextElem = this.firstElement.parentNode.firstChild;

      do {
        if (nextElem.nodeType === 3) continue; // ignore text nodes

        if (nextElem === this.firstElement) continue; // ignore this.firstElement of target

        if (nextElem === this.firstElement.nextElementSibling) {
          if (!filter || filter(this.firstElement)) {
            sibs.push(nextElem);
            this.firstElement = nextElem;
          }
        }
      } while (nextElem = nextElem.nextSibling);

      return $utils(sibs);
    }

    closest(selector) {
      if (!this.firstElement) {
        return this;
      }

      const matchesSelector = this.firstElement.matches || this.firstElement.webkitMatchesSelector || this.firstElement.mozMatchesSelector || this.firstElement.msMatchesSelector;

      while (this.firstElement) {
        if (matchesSelector.call(this.firstElement, selector)) {
          return $utils(this.firstElement);
        } else {
          this.firstElement = this.firstElement.parentElement;
        }
      }

      return $utils(null);
    }

    parentsUntil(selector, filter) {
      if (!this.firstElement) {
        return this;
      }

      const result = [];
      const matchesSelector = this.firstElement.matches || this.firstElement.webkitMatchesSelector || this.firstElement.mozMatchesSelector || this.firstElement.msMatchesSelector; // match start from parent

      let el = this.firstElement.parentElement;

      while (el && !matchesSelector.call(el, selector)) {
        if (!filter) {
          result.push(el);
        } else {
          if (matchesSelector.call(el, filter)) {
            result.push(el);
          }
        }

        el = el.parentElement;
      }

      return $utils(result);
    }

    val(value) {
      if (!this.firstElement) {
        return this;
      }

      if (value === undefined) {
        return this.firstElement.value;
      } else {
        this.firstElement.value = value;
      }
    }

    attr(name, value) {
      if (value === undefined) {
        if (!this.firstElement) {
          return '';
        }

        return this.firstElement.getAttribute(name);
      }

      this.each(el => {
        el.setAttribute(name, value);
      });
      return this;
    }

    removeAttr(attributes) {
      var attrs = attributes.split(' ');
      this.each(function (el) {
        attrs.forEach(function (attr) {
          return el.removeAttribute(attr);
        });
      });
      return this;
    }

    hasAttribute(attribute) {
      if (!this.firstElement) {
        return false;
      }

      return this.firstElement.hasAttribute(attribute);
    }

    data(name, value) {
      return this.attr('data-' + name, value);
    }

    css(css, value) {
      if (value !== undefined) {
        this.each(el => {
          this._setCss(el, css, value);
        });
        return this;
      } else {
        if (typeof css === 'object') {
          for (var property in css) {
            this.each(el => {
              this._setCss(el, property, css[property]);
            });
          }

          return this;
        } else {
          const cssProp = this._camelCase(css);

          const property = this._styleSupport(cssProp);

          return getComputedStyle(this.firstElement)[property];
        }
      }
    }

    addClass(classNames = '') {
      this.each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          el.classList.add(className);
        });
      });
      return this;
    }

    removeClass(classNames) {
      this.each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          el.classList.remove(className);
        });
      });
      return this;
    }

    hasClass(className) {
      if (!this.firstElement) {
        return false;
      }

      return this.firstElement.classList.contains(className);
    }

    toggleClass(className) {
      if (!this.firstElement) {
        return this;
      }

      this.firstElement.classList.toggle(className);
    }

    find(selector) {
      return $utils(this._getSelector(selector, this.firstElement));
    }

    first() {
      if (this.selector && this.selector.length !== undefined) {
        return $utils(this.selector[0]);
      } else {
        return $utils(this.selector);
      }
    }

    eq(index) {
      return $utils(this.selector[index]);
    }

    parent() {
      return $utils(this.firstElement.parentElement);
    }

    offsetParent() {
      if (!this.firstElement) {
        return null;
      }

      return $utils(this.firstElement.offsetParent);
    }

    children() {
      return $utils(this.firstElement.children);
    }

    get() {
      return this.selector;
    }

    siblings() {
      if (!this.firstElement) {
        return null;
      }

      const elements = Array.prototype.filter.call(this.firstElement.parentNode.children, child => child !== this.firstElement);
      return $utils(elements);
    }

    index() {
      if (!this.firstElement) return -1;
      var i = 0;

      do {
        i++;
      } while (this.firstElement = this.firstElement.previousElementSibling);

      return i;
    }

    wrap(className) {
      this.each(function (el) {
        const wrapper = document.createElement('div');
        wrapper.className = className;
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
      });
      return this;
    }

    unwrap() {
      this.each(function (el) {
        let elParentNode = el.parentNode;

        if (elParentNode !== document.body) {
          elParentNode.parentNode.insertBefore(el, elParentNode);
          elParentNode.parentNode.removeChild(elParentNode);
        }
      });
      return this;
    }

    on(events, listener) {
      if (!this.selector) {
        return this;
      }

      events.split(' ').forEach(event => {
        if (!Array.isArray(Utils.eventListeners[event])) {
          Utils.eventListeners[event] = [];
        }

        Utils.eventListeners[event].push(listener);
        this.each(function (el) {
          el.addEventListener(event.split('.')[0], listener);
        });
      });
      return this;
    }

    one(event, listener) {
      this.each(el => {
        $utils(el).on(event, () => {
          $utils(el).off(event);
          listener(event);
        });
      });
      return this;
    }

    _isEventMatched(event, eventName) {
      const eventNamespace = eventName.split('.');
      return event.split('.').filter(e => e).every(e => {
        return eventNamespace.indexOf(e) !== -1;
      });
    }

    off(event) {
      if (!this.selector) {
        return this;
      }

      Object.keys(Utils.eventListeners).forEach(eventName => {
        if (this._isEventMatched(event, eventName)) {
          Utils.eventListeners[eventName].forEach(listener => {
            this.each(function (el) {
              el.removeEventListener(eventName.split('.')[0], listener);
            });
          });
        }
      });
      return this;
    }

    trigger(event, detail) {
      if (!this.firstElement) {
        return this;
      }

      const eventName = event.split('.')[0];
      const isNativeEvent = typeof document.body['on' + eventName] !== 'undefined';

      if (isNativeEvent) {
        this.each(function (el) {
          el.dispatchEvent(new Event(eventName));
        });
        return this;
      }

      var customEvent = new CustomEvent(eventName, {
        detail: detail || null
      });
      this.each(function (el) {
        el.dispatchEvent(customEvent);
      });
      return this;
    } // Does not support IE


    load(url) {
      var _this = this;

      fetch(url).then(function (res) {
        _this.selector.innerHTML = res;
      });
      return this;
    }

    html(html) {
      if (html === undefined) {
        if (!this.firstElement) {
          return '';
        }

        return this.firstElement.innerHTML;
      }

      this.each(function (el) {
        el.innerHTML = html;
      });
      return this;
    }

    text(text) {
      if (text === undefined) {
        if (!this.firstElement) {
          return '';
        }

        return this.firstElement.textContent;
      }

      this.each(function (el) {
        el.textContent = text;
      });
      return this;
    }

    append(html) {
      this.each(function (el) {
        if (typeof html === 'string') {
          el.insertAdjacentHTML('beforeend', html);
        } else {
          el.appendChild(html);
        }
      });
      return this;
    }

    prepend(html) {
      this.each(function (el) {
        if (typeof html === 'string') {
          el.insertAdjacentHTML('afterbegin', html);
        } else {
          el.insertBefore(html, el.firstChild);
        }
      });
      return this;
    }

    remove() {
      this.each(function (el) {
        el.parentNode.removeChild(el);
      });
      return this;
    }

    empty() {
      this.each(function (el) {
        el.innerHTML = '';
      });
      return this;
    }

    is(el) {
      if (typeof el === 'string') {
        return (this.firstElement.matches || this.firstElement.matchesSelector || this.firstElement.msMatchesSelector || this.firstElement.mozMatchesSelector || this.firstElement.webkitMatchesSelector || this.firstElement.oMatchesSelector).call(this.firstElement, el);
      }

      return this.firstElement === (el.firstElement || el);
    }

    width() {
      if (!this.firstElement) {
        return 0;
      }

      var style = window.getComputedStyle(this.firstElement, null);
      return parseFloat(style.width.replace('px', ''));
    } // Outer Width With Margin if margin is true


    outerWidth(margin) {
      if (!this.firstElement) {
        return 0;
      }

      if (margin !== undefined) {
        let width = this.firstElement.offsetWidth;
        const style = window.getComputedStyle(this.firstElement);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
      }

      return this.firstElement.offsetWidth;
    }

    height() {
      if (!this.firstElement) {
        return 0;
      }

      var style = window.getComputedStyle(this.firstElement, null);
      return parseFloat(style.height.replace('px', ''));
    }

    outerHeight(margin) {
      if (!this.firstElement) {
        return 0;
      }

      if (margin !== undefined) {
        var height = this.firstElement.offsetHeight;
        var style = getComputedStyle(this.firstElement);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
      }

      return this.firstElement.offsetHeight;
    }

    scrollTop(scrollTop) {
      if (scrollTop !== undefined) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        return this;
      } else {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }
    }

    scrollLeft(scrollLeft) {
      if (scrollLeft !== undefined) {
        document.body.scrollLeft = scrollLeft;
        document.documentElement.scrollLeft = scrollLeft;
        return this;
      } else {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }
    }

    offset() {
      if (!this.firstElement) {
        return {
          left: 0,
          top: 0
        };
      }

      const box = this.firstElement.getBoundingClientRect();
      return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
      };
    }

    position() {
      return {
        left: this.firstElement.offsetLeft,
        top: this.firstElement.offsetTop
      };
    }

    static isFunction(item) {
      if (typeof item === 'function') {
        return true;
      }

      var type = Object.prototype.toString.call(item);
      return type === '[object Function]' || type === '[object GeneratorFunction]';
    }
    /*$$ Template END $$*/


  }

  _defineProperty(Utils, "eventListeners", {});

  function $utils(selector) {
    return new Utils(selector);
  }

  return $utils;

})));
