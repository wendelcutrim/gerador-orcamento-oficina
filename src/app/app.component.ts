import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: ` <main class="container">
        <router-outlet></router-outlet>
    </main>`,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'gerador-orcamento-oficina';
}
