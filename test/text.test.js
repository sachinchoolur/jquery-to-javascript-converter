import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('text method', () => {
    test('Should be able to get text content', () => {
        document.body.innerHTML = `<button class="btn">Button 1</button><button class="btn">Button 2</button>`;
        const text = $utils('.btn').text();
        expect(text).toBe('Button 1');
    });
    test('Should be able to set text content', () => {
        document.body.innerHTML = `<button class="btn">Button 1</button><button class="btn">Button 2</button>`;
        const text = $utils('.btn').text('button 3');
        expect(document.querySelector('.btn').textContent).toBe('button 3');
    });
    test('Should return empty string if element does not exist', () => {
        document.body.innerHTML = ``;
        const text = $utils('.btn').text();
        expect(text).toBe('');
    });
});
