import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('nextAll method', () => {
    test('Should be able to get all following siblings', () => {
        document.body.innerHTML = `<button class="btn">Button</button><button class="btn-1">Button</button><button class="btn-3">Button</button>`;

        const nextElements = $utils('.btn').nextAll();
        expect(nextElements.get().length).toBe(2);

        const firstBtn = document.querySelector('.btn-1');
        expect(nextElements.first().is(firstBtn)).toBeTruthy();

        const classNames = [];
        nextElements.each((el) => {
            classNames.push(el.className);
        });
        expect(classNames).toEqual(['btn-1', 'btn-3']);
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').nextAll();
        expect($).toBeInstanceOf(Utils);
    });
});
