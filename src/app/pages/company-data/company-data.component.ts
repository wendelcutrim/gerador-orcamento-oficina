import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICompany } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-company-data',
    templateUrl: './company-data.component.html',
    styleUrls: ['./company-data.component.scss'],
})
export class CompanyDataComponent {
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

    save() {
        if (this.company.valid) {
            this.companyService.setCompany(this.company.value as ICompany).subscribe({
                next: (res) => {
                    this.company.reset();
                    Swal.fire({
                        title: 'Dados da empresa salvos com sucesso!',
                        text: 'Clique em "OK" para prosseguir',
                        icon: 'success',
                        // confirmButtonText: 'deletar',
                        cancelButtonColor: '#3f51b5',
                    }).then((res) => {
                        this.router.navigate(['/']);
                    });
                },
            });
        }
    }
}
