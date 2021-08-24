import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('html method', () => {
    test('Should be able to get get HTML', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn"></button></div>`;
        const html = $utils('.wrap').html();
        expect(html).toBe('<button class="btn"></button>');
    });
    test('Should be able to return empty string if element not found', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn"></button></div>`;
        const htmlNotExist = $utils('.wrap-not-exist').html();
        expect(htmlNotExist).toBe('');
    });
    test('Should be able to set HTML', () => {
        document.body.innerHTML = `<div class="wrap"><div class="content content-1"></div><div class="content content-2"></div></div>`;
        const name = $utils('.content').html('<b>Bold content</b>');
        expect(document.querySelector('.content-1').innerHTML).toBe(
            '<b>Bold content</b>'
        );
        expect(document.querySelector('.content-2').innerHTML).toBe(
            '<b>Bold content</b>'
        );
    });
});
