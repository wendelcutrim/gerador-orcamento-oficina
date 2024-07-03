import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertIcon, AlertVariant } from 'src/app/interfaces/alert.interface';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
    @Input() showAlert: boolean = false;
    @Input() icon: AlertIcon = 'info';
    @Input() title: string = '';
    @Input() text: string = '';
    @Input() showCloseButton: boolean = true;
    @Input() variant: AlertVariant = 'info';

    @Output() closeAlert = new EventEmitter<boolean>();

    close() {
        this.closeAlert.emit(true);
    }
}
