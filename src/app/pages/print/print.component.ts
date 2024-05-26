import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { IOrcamento, IServico, IVeiculo, TipoServico, TipoServicos } from 'src/app/interfaces/orcamento.interface';
import { PrintService } from 'src/app/services/print.service';
import dayjs from 'dayjs';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.scss'],
})
export class PrintComponent implements OnInit {
    @ViewChild('printArea') printArea!: ElementRef<HTMLElement>;
    private printService: PrintService = inject(PrintService);
    private router: Router = inject(Router);

    jobs: IOrcamento[] = [{ descricao: 'a', id: '1', tipo: 'funilaria', valor: '10' }];
    vehicleData: IVeiculo = {
        marca: '',
        placa: '',
        proprietario: '',
    };
    comments: string = '';
    displayedColumns: string[] = ['job', 'description', 'value'];
    showTable: boolean = false;
    today: Date = new Date();
    next10days = dayjs().add(10, 'day').format('DD/MM/YYYY');
    pdfOptions = {
        margin: 2,
        filename: `orçamento ${this.vehicleData.proprietario} ${dayjs(this.today).format('DD/MM/YYYY')}.pdf`,
        // image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.showTable = false;
        this.printService.getJobs().subscribe({
            next: (res) => {
                console.log('fetchData.getJobsService res: ', res);
                this.jobs = this.transformJobArr(res);
                if (this.jobs.length > 0) this.showTable = true;
            },
        });

        this.printService.getVehicleData().subscribe({
            next: (res) => {
                this.vehicleData.marca = res.marca;
                this.vehicleData.placa = res.placa;
                this.vehicleData.proprietario = res.proprietario;
            },
        });

        this.printService.getComments().subscribe({
            next: (res) => {
                this.comments = res;
            },
        });
    }

    parseJobTitleKey(key: TipoServico): string {
        const jobsParsed = {
            funilaria: 'funilaria',
            pintura: 'pintura',
            maoDeObra: 'mão de obra',
            peca: 'peças',
        };

        return jobsParsed[key];
    }

    transformJobArr(jobs: TipoServicos): IOrcamento[] {
        const jobsMapped: IOrcamento[] = [];

        Object.keys(jobs).forEach((key) => {
            if (jobs[key].length > 0) {
                jobs[key].forEach((job) => {
                    jobsMapped.push({
                        ...job,
                        tipo: this.parseJobTitleKey(key as TipoServico),
                    });
                });
            }
        });

        return jobsMapped;
    }

    getTotalCost() {
        return this.jobs.reduce((acc, job) => acc + Number(job.valor), 0).toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
    }

    redirectTo(url?: string) {
        if (url) {
            this.router.navigate([`/${url}`]);
        } else {
            this.router.navigate(['/']);
        }
    }

    print() {
        console.log('chamou a função print');
        html2pdf().set(this.pdfOptions).from(this.printArea.nativeElement).save();
        Swal.fire({
            // position: 'top-end',
            // timer: 2000,
            icon: 'success',
            title: `Download do orçamento ${this.pdfOptions.filename} concluído com sucesso!`,
            text: 'verifique o arquivo na pasta de download e envie para o cliente através do whatsapp!',
            showConfirmButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                this.printService.resetAllState();
                this.redirectTo();
            }
        });
    }
}
