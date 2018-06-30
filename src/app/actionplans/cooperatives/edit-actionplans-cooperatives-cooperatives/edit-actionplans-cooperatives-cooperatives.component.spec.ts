import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionplansCooperativesCooperativesComponent } from './edit-actionplans-cooperatives-cooperatives.component';

describe('EditActionplansCooperativesCooperativesComponent', () => {
  let component: EditActionplansCooperativesCooperativesComponent;
  let fixture: ComponentFixture<EditActionplansCooperativesCooperativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActionplansCooperativesCooperativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionplansCooperativesCooperativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
