import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

function createMockDiv(width, height) {
    const div = document.createElement('div');
    Object.assign(div.style, {
        width: width + 'px',
        height: height + 'px',
    });
    div.className = 'div-el';
    // we have to mock this for jsdom.
    div.getBoundingClientRect = () => ({
        width,
        height,
        top: 50,
        left: 100,
        right: width,
        bottom: height,
    });
    return div;
}
describe('offset method', () => {
    test('Should be able to offset of the element', () => {
        document.body.appendChild(createMockDiv(100, 100));
        window.pageYOffset = 500;
        window.pageXOffset = 500;
        Object.defineProperties(window.HTMLElement.prototype, {
            clientTop: {
                get: function () {
                    return 200;
                },
            },
            clientLeft: {
                get: function () {
                    return 200;
                },
            },
        });
        const offset = $utils('.div-el').offset();
        expect(offset).toEqual({ left: 400, top: 350 });
    });
    test('Should return 0 if element does not exist', () => {
        document.body.innerHTML = '';
        const offset = $utils('.div-el').offset();
        expect(offset).toEqual({ left: 0, top: 0 });
    });
});
