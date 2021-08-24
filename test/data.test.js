import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('data method', () => {
    test('Should be able to get data attribute', () => {
        document.body.innerHTML = `<button class="btn" data-name="btn"></button>`;
        const name = $utils('.btn').data('name');
        expect(name).toBe('btn');
    });
    test('Should be able to get data attribute', () => {
        document.body.innerHTML = `<button class="btn"></button>`;
        const name = $utils('.btn').data('name', 'button');
        expect(document.querySelector('.btn').getAttribute('data-name')).toBe(
            'button'
        );
    });
});
