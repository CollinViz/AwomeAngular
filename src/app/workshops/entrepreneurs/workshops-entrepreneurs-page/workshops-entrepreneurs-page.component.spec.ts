import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsEntrepreneursPageComponent } from './workshops-entrepreneurs-page.component';

describe('WorkshopsEntrepreneursPageComponent', () => {
  let component: WorkshopsEntrepreneursPageComponent;
  let fixture: ComponentFixture<WorkshopsEntrepreneursPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsEntrepreneursPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsEntrepreneursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
