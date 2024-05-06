import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('closest method', () => {
    test('Should be able to get the closest matching element', () => {
        document.body.innerHTML = `<ul class="list-1">
            <li class="li-1">list 1</li>
            <li class="li-2">
                list 2
                <ul class="list-2">
                    <li class="li-2-1">list 1</li>
                    <li class="li-2-2">list 1</li>
                </ul>
            </li>
        </ul>
        `;

        expect($utils('.li-2-2').closest('li').hasClass('li-2-2')).toBeTruthy();
        expect(
            $utils('.li-2-2').closest('li.li-2').hasClass('li-2')
        ).toBeTruthy();
        expect($utils('.li-2-2').closest('ul').hasClass('list-2')).toBeTruthy();
        expect(
            $utils('.li-2-2').closest('.list-1').hasClass('list-1')
        ).toBeTruthy();

        expect($utils('.li-2').closest('li').hasClass('li-2')).toBeTruthy();
        expect($utils('.li-2').closest('ul').hasClass('list-1')).toBeTruthy();
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').closest('el');
        expect($).toBeInstanceOf(Utils);
    });
    test('should return this if element closet element not found', () => {
        document.body.innerHTML = `<button class="btn">Button</button>`;
        const $ = $utils('.btn').closest('el');
        expect($).toBeInstanceOf(Utils);
    });
});
