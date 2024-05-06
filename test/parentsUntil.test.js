import '@testing-library/jest-dom';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('parentsUntil method', () => {
    test('Should be able to get the parent matching element', () => {
        document.body.innerHTML = `<ul class="level-1 yes">
        <li class="item-i">I</li>
        <li class="item-ii">II
          <ul class="level-2 yes">
            <li class="item-a">A</li>
            <li class="item-b">B
              <ul class="level-3">
                <li class="item-1">1</li>
                <li class="item-2">2</li>
                <li class="item-3">3</li>
              </ul>
            </li>
            <li class="item-c">C</li>
          </ul>
        </li>
        <li class="item-iii">III</li>
      </ul>
        `;

        $utils('li.item-a').parentsUntil('.level-1').addClass('red');

        $utils('li.item-2')
            .parentsUntil('ul.level-1', '.yes')
            .addClass('green');

        expect($utils('.item-ii').hasClass('red')).toBeTruthy();
        expect($utils('.level-2').hasClass('red')).toBeTruthy();
        expect($utils('.level-2').hasClass('green')).toBeTruthy();
    });
    test('should return this if element does not exist', () => {
        const $ = $utils('#btn').parentsUntil('el');
        expect($).toBeInstanceOf(Utils);
    });
});
