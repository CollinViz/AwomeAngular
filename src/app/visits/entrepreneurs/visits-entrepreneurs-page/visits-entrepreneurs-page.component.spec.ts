import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsEntrepreneursPageComponent } from './visits-entrepreneurs-page.component';

describe('VisitsEntrepreneursPageComponent', () => {
  let component: VisitsEntrepreneursPageComponent;
  let fixture: ComponentFixture<VisitsEntrepreneursPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsEntrepreneursPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsEntrepreneursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
