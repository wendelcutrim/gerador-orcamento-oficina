import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JobSummaryComponent } from './components/job-summary/job-summary.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from './components/alert/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VehiclePlateMaskDirective } from './directives/vehicle-plate-mask.directive';
import { PrintComponent } from './pages/print/print.component';
import { MatTableModule } from '@angular/material/table';
import { CompanyDataComponent } from './pages/company-data/company-data.component';
import { CompanyFormModalComponent } from './components/company-form-modal/company-form-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent,
        JobSummaryComponent,
        AlertComponent,
        VehiclePlateMaskDirective,
        PrintComponent,
        CompanyDataComponent,
        CompanyFormModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatExpansionModule,
        MatChipsModule,
        MatDividerModule,
        MatListModule,
        MatTableModule,
        SweetAlert2Module.forRoot(),
    ],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        // { provide: LOCALE_ID, useValue: 'pt-BR' },
        // { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
        // { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { style: 'currency', currency: 'BRL' } },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
