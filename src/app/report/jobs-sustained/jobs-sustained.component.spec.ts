import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSustainedComponent } from './jobs-sustained.component';

describe('JobsSustainedComponent', () => {
  let component: JobsSustainedComponent;
  let fixture: ComponentFixture<JobsSustainedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsSustainedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsSustainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
