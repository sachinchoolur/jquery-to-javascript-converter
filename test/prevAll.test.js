import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('PrevAll method', () => {
    test('Should be able to get all preceding siblings', () => {
        document.body.innerHTML = `<button class="btn">Button</button>text<button class="btn-1">Button</button><button class="btn-3">Button</button>`;

        const prevElements = $utils('.btn-3').prevAll();
        expect(prevElements.get().length).toBe(2);

        const firstBtn = document.querySelector('.btn-1');
        expect(prevElements.first().is(firstBtn)).toBeTruthy();

        const classNames = [];
        prevElements.each((el) => {
            classNames.push(el.className);
        });
        expect(classNames).toEqual(['btn-1', 'btn']);
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').prevAll();
        expect($).toBeInstanceOf(Utils);
    });
});
