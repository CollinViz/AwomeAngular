import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoansBaselineEnterpriseComponent } from './edit-loans-baseline-enterprise.component';

describe('EditLoansBaselineEnterpriseComponent', () => {
  let component: EditLoansBaselineEnterpriseComponent;
  let fixture: ComponentFixture<EditLoansBaselineEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoansBaselineEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoansBaselineEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
