import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingTrainingsComponent } from './outstanding-trainings.component';

describe('OutstandingTrainingsComponent', () => {
  let component: OutstandingTrainingsComponent;
  let fixture: ComponentFixture<OutstandingTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
