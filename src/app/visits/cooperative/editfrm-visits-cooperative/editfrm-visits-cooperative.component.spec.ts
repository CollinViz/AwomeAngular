import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfrmVisitsCooperativeComponent } from './editfrm-visits-cooperative.component';

describe('EditfrmVisitsCooperativeComponent', () => {
  let component: EditfrmVisitsCooperativeComponent;
  let fixture: ComponentFixture<EditfrmVisitsCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfrmVisitsCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfrmVisitsCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
