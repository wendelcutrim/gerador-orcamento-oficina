import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IServico, IServicoResumo, TipoServico } from 'src/app/interfaces/orcamento.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-job-summary',
    templateUrl: './job-summary.component.html',
    styleUrls: ['./job-summary.component.scss'],
})
export class JobSummaryComponent implements OnInit {
    @Input() jobs: Array<IServico> = [];
    @Input() title: string = '';
    @Output() destroyJob = new EventEmitter<{ id: string; title: string }>();

    ngOnInit(): void {}

    getAmountJob() {
        const values: number[] = [];

        this.jobs.forEach((job) => {
            values.push(Number(job.valor));
        });

        return values.reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
    }

    deleteJob(id: string, title: string): void {
        Swal.fire({
            title: 'Você realmente deseja excluir este serviço?',
            text: 'Esta ação não pode ser desfeita',
            icon: 'warning',
            confirmButtonText: 'deletar',
            cancelButtonText: 'cancelar',
            showCancelButton: true,
            confirmButtonColor: '#F44A3E',
            cancelButtonColor: '#3f51b5',
        }).then((res) => {
            if (res.isConfirmed) {
                title = this.parseTitleKey(title);
                this.destroyJob.emit({ id, title });
            }
        });
    }

    parseTitleKey(title: string): string {
        const titleKey: any = {
            funilaria: 'funilaria',
            pintura: 'pintura',
            'mão de obra': 'maoDeObra',
            peças: 'peca',
        };

        return titleKey[title];
    }
}
