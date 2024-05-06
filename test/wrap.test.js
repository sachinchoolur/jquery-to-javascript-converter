import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('wrap method', () => {
    test('Should be able to wrap any element', () => {
        document.body.innerHTML = `<button class="btn"></button>`;
        $utils('.btn').wrap('wrap');
        expect(document.querySelector('.wrap')).toBeInTheDocument();
        expect(document.querySelector('.wrap .btn')).toBeInTheDocument();
    });
});
describe('unwrap method', () => {
    test('Should be able to wrap any element', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn"></button></div>`;
        $utils('.btn').unwrap('name');
        expect(document.querySelector('.wrap')).not.toBeInTheDocument();
    });
});
