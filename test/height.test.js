import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('height method', () => {
    test('Should be able to return height', () => {
        document.body.innerHTML = `<button style="height:100px; padding: 20px" class="btn">Button</button>`;
        const height = $utils('.btn').height();
        expect(height).toBe(100);
    });
    test('should return 0 if element does not exist', () => {
        const width = $utils('#btn-does-not-exist').height();
        expect(width).toBe(0);
    });
});

describe('outer height method', () => {
    test('Should be able to return outer height of the element', () => {
        Object.defineProperties(window.HTMLElement.prototype, {
            offsetHeight: {
                get () {
                    const style = window.getComputedStyle(this);
                    return (
                        parseFloat(style.height) +
                        parseFloat(style.paddingTop) +
                        parseFloat(style.paddingBottom)
                    );
                },
            },
        });
        document.body.innerHTML = `<button style="height:100px; padding: 20px; box-sizing: unset" class="btn">Button</button>`;
        const height = $utils('.btn').outerHeight();
        expect(height).toBe(140);
    });
    test('Should be able to return outer height of the element including margin', () => {
        Object.defineProperties(window.HTMLElement.prototype, {
            offsetHeight: {
                get () {
                    const style = window.getComputedStyle(this);
                    return (
                        parseFloat(style.height) +
                        parseFloat(style.paddingTop) +
                        parseFloat(style.paddingBottom)
                    );
                },
            },
        });
        document.body.innerHTML = `<button style="height:100px; padding: 20px; box-sizing: unset; margin: 20px" class="btn">Button</button>`;
        const height = $utils('.btn').outerHeight(true);
        expect(height).toBe(180);
    });
    test('should return 0 if element does not exist', () => {
        const width = $utils('#btn-does-not-exist').outerHeight();
        expect(width).toBe(0);
    });
});
