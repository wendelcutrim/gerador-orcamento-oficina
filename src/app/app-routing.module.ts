import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { PrintComponent } from './pages/print/print.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'print', component: PrintComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/error' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
