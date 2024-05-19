import { Component, Input, OnDestroy } from '@angular/core';
import { AlertIcon, AlertVariant } from 'src/app/interfaces/alert.interface';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
    @Input() showAlert: boolean = true;
    @Input() icon: AlertIcon = 'info';
    @Input() title: string = '';
    @Input() text: string = '';
    @Input() showCloseButton: boolean = true;
    @Input() variant: AlertVariant = 'info';

    close() {
        this.showAlert = false;
    }
}
