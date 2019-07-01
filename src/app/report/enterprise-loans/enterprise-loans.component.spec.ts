import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseLoansComponent } from './enterprise-loans.component';

describe('EnterpriseLoansComponent', () => {
  let component: EnterpriseLoansComponent;
  let fixture: ComponentFixture<EnterpriseLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
