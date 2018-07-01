import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoansBaselineEnterpriseComponent } from './list-loans-baseline-enterprise.component';

describe('ListLoansBaselineEnterpriseComponent', () => {
  let component: ListLoansBaselineEnterpriseComponent;
  let fixture: ComponentFixture<ListLoansBaselineEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoansBaselineEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoansBaselineEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
