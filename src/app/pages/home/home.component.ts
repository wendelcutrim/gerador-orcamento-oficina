import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        descricao: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,. ]+$')]],
        valor: ['', [Validators.required]],
    });

    veiculoForm = this.formBuilder.group({
        proprietario: ['', [Validators.required, Validators.pattern('^[a-zA-Zs ]+$'), Validators.maxLength(255)]],
        placa: ['', [Validators.required]],
        marca: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,. ]+$'), Validators.maxLength(200)]],
    });

    observacoes: FormGroup = this.formBuilder.group({
        observacao: [''],
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
        if (this.veiculoForm.invalid || !this.hasServicos()) {
            return true;
        }

        return false;
    }

    hasServicos(): boolean {
        const { funilaria, pintura, maoDeObra, peca } = this.servicos;

        if (funilaria.length > 0 || pintura.length > 0 || maoDeObra.length > 0 || peca.length > 0) {
            return true;
        }

        return false;
    }

    deleteJob(job: { id: string; title: string }) {
        console.log('deleteJob: ', job);
        const { id, title } = job;
        this.servicos[title] = this.servicos[title].filter((servico) => servico.id !== id);
        this.alertOptions = {
            icon: 'info',
            showAlert: true,
            showCloseButton: true,
            text: '',
            title: 'Serviço excluído com sucesso!',
            variant: 'success',
        };
        windowScrollTo(0, 0);
    }
}
