import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('attr method', () => {
    test('Should be able to get css values', () => {
        document.body.innerHTML = `<button style="color: red; -webkit-text-stroke: 2px red" class="btn">Button</button>`;
        const color = $utils('.btn').css('color');
        const textStroke = $utils('.btn').css('text-stroke-color');
        expect(color).toBe('red');
        expect(textStroke).toBeUndefined();
    });
    test('Should be able to set CSS', () => {
        document.body.innerHTML = `<button class="btn">Button</button>`;
        $utils('.btn').css('color', 'blue');
        expect(document.querySelector('.btn').style.color).toBe('blue');
    });
    test('Should be able to set by pass object', () => {
        document.body.innerHTML = `<button class="btn">Button</button>`;
        $utils('.btn').css({ color: 'blue', 'font-size': '16px' });
        expect(document.querySelector('.btn').style.color).toBe('blue');
        expect(document.querySelector('.btn').style.fontSize).toBe('16px');
    });
    test('Should be able to set by pass object', () => {
        document.body.innerHTML = `<button class="btn">Button</button>`;
        $utils('.btn').css({ color: 'blue', 'font-size': '16px' });
        expect(document.querySelector('.btn').style.color).toBe('blue');
        expect(document.querySelector('.btn').style.fontSize).toBe('16px');
    });
    test('Should be get vendor prefix', () => {
        Object.defineProperties(window.HTMLElement.prototype, {
            style: {
                get: function () {
                    return {
                        WebkitTextStrokeColor: 'red',
                    };
                },
            },
        });

        window.getComputedStyle = () => {
            return {
                WebkitTextStrokeColor: 'red',
            };
        };

        document.body.innerHTML = `<button class="btn">Button</button>`;
        const strokeColor = $utils('.btn').css('text-stroke-color');
        console.log(strokeColor);
        expect(strokeColor).toBe('red');
    });
});
