export type AlertIcon = 'error' | 'warning' | 'check' | 'info';

export type AlertVariant = 'warning' | 'danger' | 'info' | 'success';

export interface Alert {
    showAlert: boolean;
    icon: AlertIcon;
    title: string;
    text: string;
    showCloseButton: boolean;
    variant: AlertVariant;
}
