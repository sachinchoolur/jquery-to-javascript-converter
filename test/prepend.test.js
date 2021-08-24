import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('prepend method', () => {
    test('Should be able prepend html string', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn">Button</button><button class="btn-1">Button</button></div>`;
        $utils('.wrap').prepend('<button class="btn-3">Button</button>');
        expect(document.querySelector('.wrap').children).toHaveLength(3);
        expect(document.querySelector('.wrap').children[0]).toHaveClass(
            'btn-3'
        );
    });
    test('Should be able prepend html', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn">Button</button><button class="btn-1">Button</button></div>`;
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btn-3');
        $utils('.wrap').prepend(btn);
        expect(document.querySelector('.wrap').children).toHaveLength(3);
        expect(document.querySelector('.wrap').children[0]).toHaveClass(
            'btn-3'
        );
    });
    test('Should be able prepend in all matching elements', () => {
        document.body.innerHTML = `<div class="wrap">
            <button class="btn">Button</button>
        </div>
        <div class="wrap">
            <button class="btn">Button</button>
        </div>`;
        $utils('.wrap').prepend('<button class="btn-2">Button</button>');
        expect(document.querySelectorAll('.btn-2')).toHaveLength(2);
    });
});
