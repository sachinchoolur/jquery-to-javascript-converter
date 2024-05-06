import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('Next method', () => {
    test('Should be able to get next element', () => {
        document.body.innerHTML = `<button class="btn">Button</button><button class="btn-1">Button</button>`;
        const prevBtn = $utils('.btn').next();
        expect(prevBtn.is(document.querySelector('.btn-1'))).toBeTruthy();
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').next();
        expect($).toBeInstanceOf(Utils);
    });
});
