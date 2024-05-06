import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('Prev method', () => {
    test('Should be able to get previous element', () => {
        document.body.innerHTML = `<button class="btn">Button</button><button class="btn-1">Button</button>`;
        const prevBtn = $utils('.btn-1').prev();
        expect(prevBtn.is(document.querySelector('.btn'))).toBeTruthy();
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').prev();
        expect($).toBeInstanceOf(Utils);
    });
});
