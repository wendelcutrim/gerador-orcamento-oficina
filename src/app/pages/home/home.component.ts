import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Alert } from 'src/app/interfaces/alert.interface';
import { IServico, TipoServico, TipoServicos } from 'src/app/interfaces/orcamento.interface';
import { windowScrollTo } from 'src/app/utils/scroll.utils';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);

    tipoServicos = ['funilaria', 'pintura', 'maoDeObra', 'peca'];

    servicos: TipoServicos = {
        funilaria: [],
        pintura: [],
        maoDeObra: [],
        peca: [],
    };

    alertOptions: Alert = {
        icon: 'info',
        showAlert: false,
        showCloseButton: true,
        text: '',
        title: '',
        variant: 'info',
    };

    tipoServico: TipoServico | null = null;

    servicoForm = this.formBuilder.group({
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
        if (this.servicoForm.valid && this.tipoServico) {
            const servico: IServico = {
                id: self.crypto.randomUUID(),
                descricao: this.servicoForm.get('descricao')?.value as string,
                valor: this.servicoForm.get('valor')?.value as string,
            };
            this.servicos[this.tipoServico].push(servico);
            this.servicoForm.reset();
            this.resetTipoServicos();
            this.alertOptions = {
                icon: 'info',
                showAlert: true,
                showCloseButton: true,
                text: '',
                title: 'Serviço adicionado com sucesso!',
                variant: 'success',
            };
            windowScrollTo(0, 0);
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

    getJobName(job: string): string {
        const parsedJobs: { [key: string]: string } = {
            funilaria: 'Funilaria',
            pintura: 'Pintura',
            maoDeObra: 'Mão de Obra',
            peca: 'Peças',
        };

        return parsedJobs[job];
    }

    setTipoServico(job: string) {
        if (job == this.tipoServico) {
            this.tipoServico = null;
            return;
        }

        this.tipoServico = job as TipoServico;
    }

    resetTipoServicos() {
        this.tipoServicos = [];
        this.tipoServico = null;
        setTimeout(() => {
            this.tipoServicos = ['funilaria', 'pintura', 'maoDeObra', 'peca'];
        });
    }

    disabledPdfButton(): boolean {
        if (this.veiculoForm.invalid && !this.hasServicos()) {
            return true;
        }

        return false;
    }

    hasServicos(): boolean {
        const { funilaria, pintura, maoDeObra, peca } = this.servicos;

        if (!funilaria.length || !pintura.length || !maoDeObra.length || !peca.length) {
            return false;
        }

        return true;
    }
}
