import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletingTrainingsComponent } from './completing-trainings.component';

describe('CompletingTrainingsComponent', () => {
  let component: CompletingTrainingsComponent;
  let fixture: ComponentFixture<CompletingTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletingTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletingTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
