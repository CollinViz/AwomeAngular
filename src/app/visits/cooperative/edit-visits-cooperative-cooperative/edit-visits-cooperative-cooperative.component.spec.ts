import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitsCooperativeCooperativeComponent } from './edit-visits-cooperative-cooperative.component';

describe('EditVisitsCooperativeCooperativeComponent', () => {
  let component: EditVisitsCooperativeCooperativeComponent;
  let fixture: ComponentFixture<EditVisitsCooperativeCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitsCooperativeCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitsCooperativeCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
