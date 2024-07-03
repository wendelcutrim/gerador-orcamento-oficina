import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appVehiclePlateMask]',
})
export class VehiclePlateMaskDirective {
    constructor() {}

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value;
        const regExp = /^[a-zA-Z0-9\s-]+$/;

        if (inputValue.length) {
            input.value = inputValue.toUpperCase();
        }

        if (inputValue.length === 3) {
            input.value = `${inputValue}-`;
        }

        if (event.key == 'Backspace') {
            input.value = inputValue.substring(0, inputValue.length - 1);
        }

        if (inputValue.length > 7) {
            event.preventDefault();
        }

        if (event.key == '-' || event.code == 'Space') {
            event.preventDefault();
        }

        if (!event.key.match(regExp)) {
            event.preventDefault();
        }
    }
}
