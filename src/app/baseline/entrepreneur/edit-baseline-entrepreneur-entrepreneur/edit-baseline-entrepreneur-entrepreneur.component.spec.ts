import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaselineEntrepreneurEntrepreneurComponent } from './edit-baseline-entrepreneur-entrepreneur.component';

describe('EditBaselineEntrepreneurEntrepreneurComponent', () => {
  let component: EditBaselineEntrepreneurEntrepreneurComponent;
  let fixture: ComponentFixture<EditBaselineEntrepreneurEntrepreneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBaselineEntrepreneurEntrepreneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBaselineEntrepreneurEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
