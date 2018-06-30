import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitsAssociationAssociationComponent } from './edit-visits-association-association.component';

describe('EditVisitsAssociationAssociationComponent', () => {
  let component: EditVisitsAssociationAssociationComponent;
  let fixture: ComponentFixture<EditVisitsAssociationAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitsAssociationAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitsAssociationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
