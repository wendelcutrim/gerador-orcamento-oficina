import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-company-form-modal',
    templateUrl: './company-form-modal.component.html',
    styleUrls: ['./company-form-modal.component.scss'],
})
export class CompanyFormModalComponent implements OnInit, OnDestroy {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private companyService: CompanyService = inject(CompanyService);

    constructor(public dialogRef: MatDialogRef<CompanyFormModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ICompany | null) {}

    subscription: Subscription;

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

    ngOnInit(): void {
        this.subscription = this.companyService.getCompany().subscribe({
            next: (res) => {
                if (res !== null) this.company.patchValue(res);
            },
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    update() {
        if (this.company.valid) {
            this.data = this.company.value;
        }
    }

    closeModal() {
        this.company.reset();
        this.dialogRef.close();
    }
}
