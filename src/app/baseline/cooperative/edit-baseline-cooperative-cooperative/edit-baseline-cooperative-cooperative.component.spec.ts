import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaselineCooperativeCooperativeComponent } from './edit-baseline-cooperative-cooperative.component';

describe('EditBaselineCooperativeCooperativeComponent', () => {
  let component: EditBaselineCooperativeCooperativeComponent;
  let fixture: ComponentFixture<EditBaselineCooperativeCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBaselineCooperativeCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBaselineCooperativeCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
