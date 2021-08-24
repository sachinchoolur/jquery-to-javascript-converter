import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('attr method', () => {
    test('Should be able to get attribute', () => {
        document.body.innerHTML = `<button class="btn" disabled="disabled"></button>`;
        const disabled = $utils('.btn').attr('disabled');
        const className = $utils('.btn').attr('class');
        expect(disabled).toBe('disabled');
        expect(className).toBe('btn');
    });
    test('Should be able to set attribute', () => {
        document.body.innerHTML = `<button class="btn"></button>`;
        $utils('.btn').attr('disabled', 'disabled');
        $utils('.btn').attr('name', 'button');
        expect(document.querySelector('.btn').getAttribute('disabled')).toBe(
            'disabled'
        );
        expect(document.querySelector('.btn').getAttribute('name')).toBe(
            'button'
        );
    });
    test('should return empty value if element does not exist', () => {
        const attr = $utils('#btn-does-not-exist').attr('el');
        expect(attr).toBe('');
    });
});
describe('removeAttr method', () => {
    test('Should be able to get attribute', () => {
        document.body.innerHTML = `<button id="btn" class="btn" disabled="disabled"></button>`;
        $utils('.btn').removeAttr('disabled');
        $utils('.btn').removeAttr('class');
        expect(document.getElementById('btn')).not.toHaveAttribute('disabled');
        expect(document.getElementById('btn')).not.toHaveAttribute('class');
    });
});
describe('hasAttribute method', () => {
    test('Should be able to get attribute', () => {
        document.body.innerHTML = `<button id="btn" class="btn" disabled="disabled"></button>`;
        const disabled = $utils('.btn').hasAttribute('disabled');
        const className = $utils('.btn').hasAttribute('class');
        const type = $utils('.btn').hasAttribute('type');
        expect(disabled).toBeTruthy();
        expect(className).toBeTruthy();
        expect(type).toBeFalsy();
    });
    test('should return false if element does not exist', () => {
        const attr = $utils('#btn-does-not-exist').hasAttribute('el');
        expect(attr).toBeFalsy();
    });
});
