import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkshopsEntrepreneursEntrepreneursComponent } from './edit-workshops-entrepreneurs-entrepreneurs.component';

describe('EditWorkshopsEntrepreneursEntrepreneursComponent', () => {
  let component: EditWorkshopsEntrepreneursEntrepreneursComponent;
  let fixture: ComponentFixture<EditWorkshopsEntrepreneursEntrepreneursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkshopsEntrepreneursEntrepreneursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkshopsEntrepreneursEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
