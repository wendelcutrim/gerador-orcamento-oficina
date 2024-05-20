import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Alert } from 'src/app/interfaces/alert.interface';
import { IServico } from 'src/app/interfaces/orcamento.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    servicos: IServico[] = [];
    alertOptions: Alert = {
        icon: 'info',
        showAlert: false,
        showCloseButton: true,
        text: '',
        title: '',
        variant: 'info',
    };

    servicoForm = this.formBuilder.group({
        tipo: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        valor: ['', [Validators.required]],
    });

    veiculoForm = this.formBuilder.group({
        proprietario: ['', [Validators.required]],
        placa: ['', [Validators.required]],
        marca: ['', [Validators.required]],
    });

    ngOnInit(): void {}

    addJob() {
        if (this.servicoForm.valid) {
            this.servicos.push(this.servicoForm.value as IServico);
            this.servicoForm.reset();
        } else {
            this.alertOptions = {
                icon: 'error',
                showAlert: true,
                showCloseButton: true,
                text: 'Preencha os dados de serviços corretamente!',
                title: 'Erro ao adicionar o serviço',
                variant: 'danger',
            };
        }
    }

    handleAlertEvent() {
        this.alertOptions.showAlert = false;
    }
}
