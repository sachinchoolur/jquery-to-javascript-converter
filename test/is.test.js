import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('is method', () => {
    test('Should return true if element is same', () => {
        document.body.innerHTML = `<div class="wrap">
            <button class="btn"></button>
            <button class="btn-1"></button>
            <button id="btn-2"></button>
        </div>`;
        const wrap = $utils('.wrap');
        const btn = $utils('.btn');
        const btn1 = $utils('.btn-1');
        const btn1Copy = $utils('.btn-1');
        const btn2 = $utils('#btn-2');

        expect(wrap.is(document.querySelector('.wrap'))).toBeTruthy();
        expect(wrap.is('.wrap')).toBeTruthy();
        expect(btn.is(btn)).toBeTruthy();
        expect(btn1.is(btn1Copy)).toBeTruthy();
        expect(btn.is(btn1)).toBeFalsy();
        expect(btn2.is('#btn-2')).toBeTruthy();
        expect(btn2.is('#btn-3')).toBeFalsy();
    });
});
