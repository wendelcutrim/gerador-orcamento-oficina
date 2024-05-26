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
        // this.router.navigate(['/home']);
    }
}
