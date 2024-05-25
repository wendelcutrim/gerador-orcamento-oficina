import { Injectable } from '@angular/core';
import { IVeiculo, TipoServicos } from '../interfaces/orcamento.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PrintService {
    private jobs = new BehaviorSubject<TipoServicos>({
        funilaria: [],
        pintura: [],
        maoDeObra: [],
        peca: [],
    });
    private vehicleData = new BehaviorSubject<IVeiculo>({
        marca: '',
        placa: '',
        proprietario: '',
    });

    constructor() {}

    setJobs(jobs: TipoServicos): Observable<TipoServicos> {
        this.jobs.next(jobs);
        return this.jobs.asObservable();
    }

    setVehicleData(vehicleData: IVeiculo): Observable<IVeiculo> {
        this.vehicleData.next(vehicleData);
        return this.vehicleData.asObservable();
    }

    getJobs(): Observable<TipoServicos> {
        return this.jobs.asObservable();
    }

    getVehicleData(): Observable<IVeiculo> {
        return this.vehicleData.asObservable();
    }
}
