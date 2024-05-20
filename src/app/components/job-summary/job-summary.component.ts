import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IServico, IServicoResumo } from 'src/app/interfaces/orcamento.interface';

@Component({
    selector: 'app-job-summary',
    templateUrl: './job-summary.component.html',
    styleUrls: ['./job-summary.component.scss'],
})
export class JobSummaryComponent implements OnInit {
    @Input() jobs: Array<IServico> = [];
    jobsByGroup: IServicoResumo = {};
    jobsMapped: Array<IServicoResumo> = [];
    private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.groupByJobs();
        this.getJobsMapped();
    }

    groupByJobs() {
        this.jobs.forEach((job) => {
            if (job.tipo.toUpperCase() in this.jobsByGroup) {
                this.jobsByGroup[job.tipo.toUpperCase()].push({
                    title: job.tipo.toUpperCase(),
                    jobs: job,
                });
            } else {
                this.jobsByGroup[job.tipo.toUpperCase()] = [
                    {
                        title: job.tipo.toUpperCase(),
                        jobs: job,
                    },
                ];
            }
        });
    }

    getJobsMapped() {
        for (let group in this.jobsByGroup) {
            this.jobsMapped.push({ [group]: this.jobsByGroup[group] });
        }
    }

    getGroupTitle(groupValue: string) {
        const group = this.jobsMapped[Number(groupValue)];
        const title = Object.keys(group)[0];
        return title;
    }

    getGroupList(groupValue: string) {
        const group = this.jobsMapped[Number(groupValue)];
        const list = Object.values(group)[0];

        return list;
    }
}
