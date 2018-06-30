import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitsEntrepreneursEntrepreneursComponent } from './edit-visits-entrepreneurs-entrepreneurs.component';

describe('EditVisitsEntrepreneursEntrepreneursComponent', () => {
  let component: EditVisitsEntrepreneursEntrepreneursComponent;
  let fixture: ComponentFixture<EditVisitsEntrepreneursEntrepreneursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitsEntrepreneursEntrepreneursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitsEntrepreneursEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
