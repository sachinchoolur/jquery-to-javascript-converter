import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('Find method', () => {
    test('Should be able find element from $utils collection', () => {
        document.body.innerHTML = `<div class="level1">
            <div id="level2">
                <button id="btn">Button1</button>
                <button id="btn">Button1</button>
                <button class="btn">Button2</button>
            </div>
        </div>`;
        const $level1 = $utils('.level1');
        const $level2 = $utils('#level1');
        expect($level1.find('#btn').get()).toHaveTextContent('Button1');
        expect($level1.find('#level2 #btn').get()).toHaveTextContent('Button1');
        expect($level1.find('#level2 .btn').first().get()).toHaveTextContent(
            'Button2'
        );
        expect($level1.find('#btn').get()).toHaveTextContent('Button1');
        expect($level2.find('#btn').first().get()).toHaveTextContent('Button1');
        expect($level1.find('.btn').first().get()).toHaveTextContent('Button2');
        expect($level2.find('.btn').first().get()).toHaveTextContent('Button2');
    });
});
describe('First method', () => {
    test('Should be able get the first matching node', () => {
        document.body.innerHTML = `<div class="level1">
            <button class="btn">Button1</button>
            <button class="btn">Button2</button>
            <button id="btn">Button3</button>
        </div>`;
        expect($utils('.btn').first().get()).toHaveTextContent('Button1');
        expect($utils('#btn').first().get()).toHaveTextContent('Button3');
    });
});
describe('eq method', () => {
    test('Should be able return element at the matching index', () => {
        document.body.innerHTML = `<div class="level1">
            <button class="btn">Button1</button>
            <button class="btn">Button2</button>
            <button class="btn">Button3</button>
        </div>`;
        expect($utils('.btn').eq(2).get()).toHaveTextContent('Button3');
        expect($utils('.btn').eq(0).get()).toHaveTextContent('Button1');
    });
});
describe('parent method', () => {
    test('Should be able return the parent element', () => {
        document.body.innerHTML = `<div class="level1">
            <button id="btn">Button1</button>
            <button class="btn">Button2</button>
            <button class="btn">Button3</button>
        </div>`;
        expect($utils('#btn').parent().get()).toHaveClass('level1');
        expect($utils('.btn').parent().get()).toHaveClass('level1');
    });
});
describe('offsetParent method', () => {
    test('Should be able return the offsetParent element', () => {
        document.body.innerHTML = `<div class="level1">
            <div class="level-2" style="position: relative">
                <button id="btn">Button1</button>
            </div>
        </div>`;
        Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
            get() {
                return this.parentNode;
            },
        });
        expect($utils('#btn').offsetParent().get()).toHaveClass('level-2');
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn-does-not-exist').offsetParent('el');
        expect($).toBeInstanceOf(Utils);
    });
});
describe('children method', () => {
    test('Should be able return the children', () => {
        document.body.innerHTML = `<div class="level1">
            <button id="btn">Button1</button>
            <button class="btn">Button2</button>
            <button class="btn">Button3</button>
        </div>`;
        expect($utils('.level1').children().get()).toHaveLength(3);
        expect($utils('.level1').children().first().get()).toHaveTextContent(
            'Button1'
        );
    });
});
describe('get method', () => {
    test('Should be able return the actual dom element', () => {
        document.body.innerHTML = `<div class="level1">
            <button id="btn">Button1</button>
            <button class="btn">Button2</button>
            <button class="btn">Button3</button>
        </div>`;
        expect($utils('.level1').children().first().get()).toHaveTextContent(
            'Button1'
        );
        expect($utils('.btn').first().get()).toHaveTextContent('Button2');
    });
});
describe('siblings method', () => {
    test('Should be able return the siblings of the element', () => {
        document.body.innerHTML = `<div class="level1">
            <button id="btn">Button1</button>
            <button class="btn">Button2</button>
            <button class="btn">Button3</button>
        </div>`;
        expect($utils('#btn').siblings().first().get()).toHaveTextContent(
            'Button2'
        );
        expect($utils('#btn').siblings().get()).toHaveLength(2);
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn-does-not-exist').siblings();
        expect($).toBeInstanceOf(Utils);
    });
});
describe('index method', () => {
    test('Should be able return the index of the element', () => {
        document.body.innerHTML = `<div class="level1">
            <button id="btn">Button1</button>
            <button class="btn">Button2</button>
            <button class="btn">Button3</button>
        </div>`;
        expect($utils('.btn').index()).toBe(2);
        expect($utils('.btn + .btn').index()).toBe(3);
        expect($utils('#btn').index()).toBe(1);
        expect($utils('#btn-do-not-exist').index()).toBe(-1);
    });
});
