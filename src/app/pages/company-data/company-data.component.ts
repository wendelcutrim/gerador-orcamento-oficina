import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/interfaces/alert.interface';
import { ICompany } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-company-data',
    templateUrl: './company-data.component.html',
    styleUrls: ['./company-data.component.scss'],
})
export class CompanyDataComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private companyService: CompanyService = inject(CompanyService);
    private router: Router = inject(Router);

    company: FormGroup = this.formBuilder.group({
        nome: [
            '',
            [Validators.required, Validators.pattern('^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿ .,:()-]+$'), Validators.minLength(3), Validators.maxLength(255)],
        ],
        cnpj: ['', [Validators.required /* Validators.pattern('^[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}$') */, , Validators.maxLength(18)]],
        endereco: [
            '',
            [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿ .,:()-/]+$')],
        ],
        celular: ['', [Validators.required]],
    });

    alertOptions: Alert = {
        icon: 'info',
        showAlert: false,
        showCloseButton: true,
        text: '',
        title: '',
        variant: 'info',
    };

    ngOnInit(): void {
        this.checkCompanyData();
    }

    save() {
        if (this.company.valid) {
            this.companyService.setCompany(this.company.value as ICompany).subscribe({
                next: (res) => {
                    this.company.reset();
                    window.location.href = window.location.href.split('/')[0];
                },
                error: (err) => {
                    const options: Alert = {
                        icon: 'error',
                        showCloseButton: false,
                        showAlert: true,
                        text: 'Ocorreu um erro ao salvar os dados da empresa, tente novamente mais tarde',
                        title: 'Erro ao salvar os dados da empresa',
                        variant: 'danger',
                    };

                    this.configAlert(options);
                },
            });
        }
    }

    handleAlertEvent() {
        this.alertOptions.showAlert = false;
    }

    configAlert(options: Alert) {
        this.alertOptions = options;
    }

    checkCompanyData() {
        const hasCompany = this.companyService.hasCompany();

        if (hasCompany) {
            this.companyService.getCompany().subscribe({
                next: (res) => {
                    if (typeof res !== null) {
                        this.company.patchValue(res as ICompany);
                    }
                },
                error: (err) => {
                    const options: Alert = {
                        icon: 'error',
                        showCloseButton: false,
                        showAlert: true,
                        text: 'Ocorreu um erro ao buscar os dados da empresa, tente novamente mais tarde',
                        title: 'Erro ao buscar os dados da empresa',
                        variant: 'danger',
                    };

                    this.configAlert(options);
                },
            });
        }
    }
}
