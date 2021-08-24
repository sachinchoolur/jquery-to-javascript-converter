import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('empty method', () => {
    test('Should be able to empty element', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn"></button><button class="btn-1"></button></div>`;
        $utils('.wrap').empty();
        expect(document.querySelector('.btn')).not.toBeInTheDocument();
        expect(document.querySelector('.btn-1')).not.toBeInTheDocument();
    });
    test('Should be able to empty all matching elements element', () => {
        document.body.innerHTML = `<div class="wrap">
            <button class="btn"></button><button class="btn-1"></button>
        </div>
        <div class="wrap">
            <button class="btn-3"></button><button class="btn-4"></button>
        </div>`;
        $utils('.wrap').empty();
        expect(document.querySelector('.btn')).not.toBeInTheDocument();
        expect(document.querySelector('.btn-1')).not.toBeInTheDocument();
        expect(document.querySelector('.btn-3')).not.toBeInTheDocument();
        expect(document.querySelector('.btn-4')).not.toBeInTheDocument();
    });
});
