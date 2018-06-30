import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingEntrepreneursEntrepreneursComponent } from './edit-training-entrepreneurs-entrepreneurs.component';

describe('EditTrainingEntrepreneursEntrepreneursComponent', () => {
  let component: EditTrainingEntrepreneursEntrepreneursComponent;
  let fixture: ComponentFixture<EditTrainingEntrepreneursEntrepreneursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainingEntrepreneursEntrepreneursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainingEntrepreneursEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
