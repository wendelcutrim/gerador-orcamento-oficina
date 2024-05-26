import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    template: ` <main class="container">
        <router-outlet></router-outlet>
    </main>`,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'gerador-orcamento-oficina';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.disableNavigationReloadOnMobileDevices();
    }

    isMobileDevice() {
        const mobileDevicesUserAgentsRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return mobileDevicesUserAgentsRegExp.test(navigator.userAgent);
    }

    disableNavigationReloadOnMobileDevices() {
        const isMobileDevice = this.isMobileDevice();
        console.log('isMobileDevice: ', isMobileDevice);
        if (isMobileDevice) {
            (window as any).navigation.reload = () => {};
        }
    }
}
