import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('offset method', () => {
    test('Should be able to offset of the element', () => {
        document.body.innerHTML = `<div class="el"></div>`;
        Object.defineProperties(window.HTMLElement.prototype, {
            offsetLeft: {
                get () {
                    return 200;
                },
            },
            offsetTop: {
                get () {
                    return 200;
                },
            },
        });
        const offset = $utils('.el').position();
        expect(offset).toEqual({ left: 200, top: 200 });
    });
});
