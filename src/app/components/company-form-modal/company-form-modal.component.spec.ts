import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormModalComponent } from './company-form-modal.component';

describe('CompanyFormModalComponent', () => {
  let component: CompanyFormModalComponent;
  let fixture: ComponentFixture<CompanyFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFormModalComponent]
    });
    fixture = TestBed.createComponent(CompanyFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
