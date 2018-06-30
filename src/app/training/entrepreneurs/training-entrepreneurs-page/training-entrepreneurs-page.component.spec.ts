import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEntrepreneursPageComponent } from './training-entrepreneurs-page.component';

describe('TrainingEntrepreneursPageComponent', () => {
  let component: TrainingEntrepreneursPageComponent;
  let fixture: ComponentFixture<TrainingEntrepreneursPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingEntrepreneursPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEntrepreneursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
