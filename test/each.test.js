// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('Each method', () => {
    test('should be able to iterate through HTML collection', () => {
        document.body.innerHTML = `<button class="btn">Button</button><button class="btn">Button</button>`;
        let indexes = [];
        let elements = [];
        $utils('.btn').each((el, index) => {
            indexes.push(index);
            elements.push(el);
        });
        expect(elements.length).toBe(2);
        expect(indexes).toEqual([0, 1]);
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').each(() => {});
        expect($).toBeInstanceOf(Utils);
    });
    test('should work on single DOM element', () => {
        document.body.innerHTML = `<button id="btn">Button</button>`;
        let indexes = [];
        let elements = [];
        $utils('#btn').each((el, index) => {
            indexes.push(index);
            elements.push(el);
        });
        expect(elements.length).toBe(1);
        expect(
            $utils(elements[0]).is(document.getElementById('btn'))
        ).toBeTruthy();
        expect(indexes).toEqual([0]);
    });
    test('this should point to the current dom element', () => {
        document.body.innerHTML = `<button id="btn">Button</button> <button class="btn">Button</button>`;

        // Single element
        let singleEl = null;
        $utils('#btn').each(function () {
            singleEl = this;
        });
        expect(
            $utils(singleEl).is(document.getElementById('btn'))
        ).toBeTruthy();

        // HTML Collection
        let elCollection = null;
        $utils('.btn').each(function () {
            elCollection = this;
        });
        expect(
            $utils(elCollection).is(document.querySelector('.btn'))
        ).toBeTruthy();
    });
});
