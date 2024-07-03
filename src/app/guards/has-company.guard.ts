import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

/*@ts-ignore-no-unused-params*/

export const hasCompanyGuard: CanActivateFn = (route, state) => {
    const companyService = inject(CompanyService);
    const router = inject(Router);

    if (!companyService.hasCompany()) {
        router.navigate(['/company']);
        return false;
    }
    return true;
};
