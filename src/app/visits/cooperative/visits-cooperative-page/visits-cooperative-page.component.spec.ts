import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsCooperativePageComponent } from './visits-cooperative-page.component';

describe('VisitsCooperativePageComponent', () => {
  let component: VisitsCooperativePageComponent;
  let fixture: ComponentFixture<VisitsCooperativePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsCooperativePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsCooperativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
