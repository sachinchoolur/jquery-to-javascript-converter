import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('width method', () => {
    test('Should be able to return width', () => {
        document.body.innerHTML = `<button style="width:100px; padding: 20px" class="btn">Button</button>`;
        const width = $utils('.btn').width();
        expect(width).toBe(100);
    });
    test('should return 0 if element does not exist', () => {
        const width = $utils('#btn-does-not-exist').width();
        expect(width).toBe(0);
    });
});

describe('outer width method', () => {
    test('Should be able to return outer width of the element', () => {
        Object.defineProperties(window.HTMLElement.prototype, {
            offsetWidth: {
                get () {
                    const style = window.getComputedStyle(this);
                    return (
                        parseFloat(style.width) +
                        parseFloat(style.paddingLeft) +
                        parseFloat(style.paddingRight)
                    );
                },
            },
        });
        document.body.innerHTML = `<button style="width:100px; padding: 20px; box-sizing: unset" class="btn">Button</button>`;
        const width = $utils('.btn').outerWidth();
        expect(width).toBe(140);
    });
    test('should return 0 if element does not exist', () => {
        const width = $utils('#btn-does-not-exist').outerWidth();
        expect(width).toBe(0);
    });
    test('Should be able to return outer width of the element including margin', () => {
        Object.defineProperties(window.HTMLElement.prototype, {
            offsetWidth: {
                get () {
                    const style = window.getComputedStyle(this);
                    return (
                        parseFloat(style.width) +
                        parseFloat(style.paddingLeft) +
                        parseFloat(style.paddingRight)
                    );
                },
            },
        });
        document.body.innerHTML = `<button style="width:100px; padding: 20px; box-sizing: unset; margin: 20px" class="btn">Button</button>`;
        const width = $utils('.btn').outerWidth(true);
        expect(width).toBe(180);
    });
});
