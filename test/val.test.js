import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('Val method', () => {
    test('Should be able to get value', () => {
        document.body.innerHTML = `<input id="input" type="text" />`;
        document.getElementById('input').value = '123';
        const val = $utils('#input').val();
        expect(val).toBe('123');
    });
    test('Should be able to set value', () => {
        document.body.innerHTML = `<input id="input" type="text" />`;
        $utils('#input').val('1234');
        expect(document.getElementById('input').value).toBe('1234');
    });
    test('should return this if element does not exist', () => {
        const val = $utils('#btn').val();
        expect(val).toBe('');
    });
});
