import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICompany } from '../interfaces/company.interface';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    private localStorageCompanyKey: string = '@gerador-orcamento-oficina:company';
    private company = new BehaviorSubject<ICompany | null>(null);

    constructor() {}

    getCompany(): Observable<ICompany | null> {
        const company = localStorage.getItem(this.localStorageCompanyKey);
        if (company) {
            this.company.next(JSON.parse(company));
        }
        return this.company.asObservable();
    }

    setCompany(company: ICompany): Observable<ICompany | null> {
        localStorage.setItem(this.localStorageCompanyKey, JSON.stringify(company));
        this.company.next(company);
        return this.company.asObservable();
    }

    hasCompany(): boolean {
        return !!localStorage.getItem(this.localStorageCompanyKey);
    }
}
