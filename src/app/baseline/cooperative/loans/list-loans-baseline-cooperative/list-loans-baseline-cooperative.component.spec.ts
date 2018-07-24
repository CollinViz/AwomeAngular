import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoansBaselineCooperativeComponent } from './list-loans-baseline-cooperative.component';

describe('ListLoansBaselineCooperativeComponent', () => {
  let component: ListLoansBaselineCooperativeComponent;
  let fixture: ComponentFixture<ListLoansBaselineCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoansBaselineCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoansBaselineCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
