import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoansBaselineCooperativeComponent } from './edit-loans-baseline-cooperative.component';

describe('EditLoansBaselineCooperativeComponent', () => {
  let component: EditLoansBaselineCooperativeComponent;
  let fixture: ComponentFixture<EditLoansBaselineCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoansBaselineCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoansBaselineCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
