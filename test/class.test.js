import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('addClass method', () => {
    test('Should be able add class', () => {
        document.body.innerHTML = `<button id="btn"></button>`;
        $utils('#btn').addClass('foo');
        expect(document.getElementById('btn')).toHaveClass('foo');
    });
});
describe('removeClass method', () => {
    test('Should be able remove class', () => {
        document.body.innerHTML = `<button class="foo" id="btn"></button>`;
        $utils('#btn').removeClass('foo');
        expect(document.getElementById('btn')).not.toHaveClass('foo');
    });
});
describe('hasClass method', () => {
    test('Should return true if class exists', () => {
        document.body.innerHTML = `<button class="foo" id="btn"></button>`;
        const hasClass = $utils('#btn').hasClass('foo');
        expect(hasClass).toBeTruthy();
    });
    test('Should return false if class does not exists', () => {
        document.body.innerHTML = `<button class="foo" id="btn"></button>`;
        const hasClass = $utils('#btn').hasClass('bar');
        expect(hasClass).toBeFalsy();
    });
    test('Should return false if element does not exists', () => {
        document.body.innerHTML = `<button class="foo"></button>`;
        const hasClass = $utils('#btn').hasClass('bar');
        expect(hasClass).toBeFalsy();
    });
});
describe('toggleClass method', () => {
    test('Should be able toggle class', () => {
        document.body.innerHTML = `<button id="btn"></button>`;
        $utils('#btn').toggleClass('foo');
        expect(document.getElementById('btn')).toHaveClass('foo');
        $utils('#btn').toggleClass('foo');
        expect(document.getElementById('btn')).not.toHaveClass('foo');
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn-does-not-exist').toggleClass('el');
        expect($).toBeInstanceOf(Utils);
    });
});
