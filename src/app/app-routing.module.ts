import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { PrintComponent } from './pages/print/print.component';
import { CompanyDataComponent } from './pages/company-data/company-data.component';
import { hasCompanyGuard } from './guards/has-company.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [hasCompanyGuard] },
    { path: 'error', component: ErrorComponent },
    { path: 'print', component: PrintComponent, canActivate: [hasCompanyGuard] },
    { path: 'company', component: CompanyDataComponent },
    { path: '**', redirectTo: '/error' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
