import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoansBaselineCoopComponent } from './list-loans-baseline-coop.component';

describe('ListLoansBaselineCoopComponent', () => {
  let component: ListLoansBaselineCoopComponent;
  let fixture: ComponentFixture<ListLoansBaselineCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoansBaselineCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoansBaselineCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
