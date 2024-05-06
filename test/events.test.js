import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import $utils, { Utils } from '../methods/vanilla-js-methods.js';

describe('on, off, and trigger methods', () => {
    test('should be able to attach event listeners', () => {
        document.body.innerHTML = `<button class="btn"></button>
        <button id="btn-2">Button 2</button>`;

        $utils('#btn-2').on('click', () => {
            $utils('.btn').first().text('Button clicked');
        });
        userEvent.click(screen.getByText('Button 2'));

        expect(document.querySelector('.btn')).toHaveTextContent(
            'Button clicked'
        );
    });
    test('on method should return this if element does not exist', () => {
        const $ = $utils('#btn-does-not-exist').on('click', () => {});
        expect($).toBeInstanceOf(Utils);
    });
    test('should be able to attach event listeners that works only once', () => {
        document.body.innerHTML = `<button class="btn">Button 2</button>
        <button class="btn">Button 3</button>`;

        let times = 0;

        $utils('.btn').one('click', () => {
            times++;
        });
        userEvent.click(screen.getByText('Button 2'));
        userEvent.click(screen.getByText('Button 2'));
        userEvent.click(screen.getByText('Button 3'));

        expect(times).toBe(2);
    });
    test('should be able to attach event listeners to all matching elements ', () => {
        document.body.innerHTML = `<button class="btn">Button 1</button>
        <button class="btn">Button 2</button>`;

        let times = 0;

        $utils('.btn').on('click', () => {
            times++;
        });

        userEvent.click(screen.getByText('Button 1'));
        expect(times).toBe(1);

        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(2);
    });
    test('should be able to remove event listeners from all matching elements ', () => {
        document.body.innerHTML = `<button class="btn">Button 1</button>
        <button class="btn">Button 2</button>`;

        let times = 0;

        $utils('.btn').on('click', () => {
            times++;
        });

        userEvent.click(screen.getByText('Button 1'));
        expect(times).toBe(1);

        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(2);

        $utils('.btn').off('click');

        userEvent.click(screen.getByText('Button 1'));
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(2);
    });
    test('off method should return this if element does not exist', () => {
        const $ = $utils('#btn-does-not-exist').off('click', () => {});
        expect($).toBeInstanceOf(Utils);
    });
    test('should be able to attach event listeners with namespace', () => {
        let times = 0;
        document.body.innerHTML = `<button class="btn"></button>
        <button id="btn-2">Button 2</button>`;

        $utils('#btn-2').on('click.btn', () => {
            times++;
            $utils('.btn').first().text(`times - ${times}`);
        });
        userEvent.click(screen.getByText('Button 2'));
        expect(document.querySelector('.btn')).toHaveTextContent('times - 1');

        userEvent.click(screen.getByText('Button 2'));
        expect(document.querySelector('.btn')).toHaveTextContent('times - 2');
    });
    test('should be able to remove event listener', () => {
        let times = 0;
        document.body.innerHTML = `
        <button id="btn-2">Button 2</button>`;

        $utils('#btn-2').on('click', () => {
            times++;
        });
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(1);

        $utils('#btn-2').off('click');
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(1);
    });
    test('should be able to remove event listener with single namespace', () => {
        let times = 0;
        document.body.innerHTML = `
        <button id="btn-2">Button 2</button>
        <button id="btn-3">Button 3</button>`;

        $utils('#btn-2').on('click.btn', () => {
            times++;
        });
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(1);

        $utils('#btn-2').off('.btn');
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(1);
    });
    test('should be able to remove event listener with any of the namespaces', () => {
        let times = 0;
        document.body.innerHTML = `
        <button id="btn-2">Button 2</button>
        <button id="btn-3">Button 3</button>`;

        $utils('#btn-2').on('click.btn', () => {
            times++;
        });
        $utils('#btn-2').on('click.btn.utils', () => {
            times++;
        });
        $utils('#btn-3').on('click.btn.utils', () => {
            times++;
        });
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(2);

        $utils('#btn-2').off('.btn');
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(2);

        userEvent.click(screen.getByText('Button 3'));
        expect(times).toBe(3);

        $utils('#btn-3').off('.utils');
        userEvent.click(screen.getByText('Button 3'));
        expect(times).toBe(3);
    });
    test('should be able to remove event listener only from the selected element', () => {
        let times = 0;
        document.body.innerHTML = `
        <button id="btn-2">Button 2</button>
        <button id="btn-3">Button 3</button>`;

        $utils('#btn-2').on('click.btn', () => {
            times++;
        });
        $utils('#btn-3').on('click.btn', () => {
            times++;
        });
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(1);

        $utils('#btn-2').off('.btn');
        userEvent.click(screen.getByText('Button 2'));
        expect(times).toBe(1);

        userEvent.click(screen.getByText('Button 3'));
        userEvent.click(screen.getByText('Button 3'));
        expect(times).toBe(3);

        $utils('#btn-3').off('.btn');

        userEvent.click(screen.getByText('Button 3'));
        userEvent.click(screen.getByText('Button 3'));
        expect(times).toBe(3);
    });

    test('should be able trigger native event', () => {
        document.body.innerHTML = `<button id="btn-1" class="btn">Button 2</button>
        <button id="btn-2" class="btn">Button 3</button>`;

        let times = 0;

        $utils('.btn').on('click.btn', () => {
            times++;
        });
        $utils('#btn-1').trigger('click.btn');
        $utils('#btn-2').trigger('click');

        expect(times).toBe(2);
    });
    test('trigger method should return this if element does not exist', () => {
        const $ = $utils('#btn-does-not-exist').trigger('click');
        expect($).toBeInstanceOf(Utils);
    });
    test('should be able trigger custom event', () => {
        document.body.innerHTML = `<button class="btn">Button 2</button>`;

        let times = 0;

        let detail = '';

        $utils('.btn').on('custom-click.btn', (event) => {
            times++;
            detail = event.detail;
        });
        $utils('.btn').trigger('custom-click.btn');
        expect(detail).toBeNull();
        $utils('.btn').trigger('custom-click.btn', {
            type: 'custom-click.btn-detail',
        });
        expect(detail).toEqual({ type: 'custom-click.btn-detail' });
        $utils('.btn').trigger('custom-click', {
            type: 'custom-click-detail',
        });

        expect(detail).toEqual({ type: 'custom-click-detail' });

        expect(times).toBe(3);
    });
});
