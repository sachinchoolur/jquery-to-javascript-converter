import '@testing-library/jest-dom';

import $utils from '../methods/vanilla-js-methods.js';

describe('remove method', () => {
    test('Should be able to remove element from dom', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn"></button></div>`;
        $utils('.btn').remove();
        expect(document.querySelector('.btn')).not.toBeInTheDocument();
    });
    test('Should be able to remove all matching elements from dom', () => {
        document.body.innerHTML = `<div class="wrap"><button class="btn"><button class="btn"></button></div>`;
        $utils('.btn').remove();
        expect(document.querySelector('.btn')).not.toBeInTheDocument();
    });
});
