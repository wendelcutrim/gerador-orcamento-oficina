import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IServico } from 'src/app/interfaces/orcamento.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    servicos: IServico[] = [];

    servicoForm = this.formBuilder.group({
        tipo: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        valor: [null, [Validators.required]],
    });

    veiculoForm = this.formBuilder.group({
        proprietario: ['', [Validators.required]],
        placa: ['', [Validators.required]],
        marca: ['', [Validators.required]],
    });

    ngOnInit(): void {}

    addJob() {
        if (this.veiculoForm.valid) {
            this.servicos.push(this.veiculoForm.value as IServico);
            this.servicoForm.reset();
        } else {
        }
    }
}
