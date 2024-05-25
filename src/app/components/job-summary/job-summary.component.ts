import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IServico, IServicoResumo } from 'src/app/interfaces/orcamento.interface';

@Component({
    selector: 'app-job-summary',
    templateUrl: './job-summary.component.html',
    styleUrls: ['./job-summary.component.scss'],
})
export class JobSummaryComponent implements OnInit {
    @Input() jobs: Array<IServico> = [];
    @Input() title: string = '';

    ngOnInit(): void {}

    getAmountJob() {
        const values: number[] = [];

        this.jobs.forEach((job) => {
            values.push(Number(job.valor));
        });

        return values.reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
    }
}
