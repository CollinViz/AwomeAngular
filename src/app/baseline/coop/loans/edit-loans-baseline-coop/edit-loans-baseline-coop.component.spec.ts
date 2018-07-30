import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoansBaselineCoopComponent } from './edit-loans-baseline-coop.component';

describe('EditLoansBaselineCoopComponent', () => {
  let component: EditLoansBaselineCoopComponent;
  let fixture: ComponentFixture<EditLoansBaselineCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoansBaselineCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoansBaselineCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
