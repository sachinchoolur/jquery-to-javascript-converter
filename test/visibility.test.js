import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('show method', () => {
    test('Show be able to display element all matching elements ', () => {
        document.body.innerHTML = `<button style="display:none" class="btn">Button</button>
        <button style="display:none" class="btn">Button</button>
        <button class="btn">Button</button>`;
        $utils('.btn').show();
        expect($utils('.btn').eq(0).css('display')).not.toBe('none');
        expect($utils('.btn').eq(1).css('display')).not.toBe('none');
        expect($utils('.btn').eq(2).css('display')).not.toBe('none');
    });

    test('Show be able to display element ', () => {
        document.body.innerHTML = `<button style="display:none" id="btn">Button</button>`;
        $utils('#btn').show();
        const display = $utils('#btn').css('display');
        expect(display).not.toBe('');
    });
});
describe('hide method', () => {
    test('Show be able to hide element all matching elements ', () => {
        document.body.innerHTML = `<button class="btn">Button</button>
        <button class="btn">Button</button>
        <button class="btn">Button</button>`;
        $utils('.btn').hide();
        expect($utils('.btn').eq(0).css('display')).toBe('none');
        expect($utils('.btn').eq(1).css('display')).toBe('none');
        expect($utils('.btn').eq(2).css('display')).toBe('none');
    });

    test('Show be able to display element ', () => {
        document.body.innerHTML = `<button style="display:none" id="btn">Button</button>`;
        $utils('#btn').hide();
        const display = $utils('#btn').css('display');
        expect(display).toBe('none');
    });
});
