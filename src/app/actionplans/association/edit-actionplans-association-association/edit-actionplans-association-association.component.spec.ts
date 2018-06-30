import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionplansAssociationAssociationComponent } from './edit-actionplans-association-association.component';

describe('EditActionplansAssociationAssociationComponent', () => {
  let component: EditActionplansAssociationAssociationComponent;
  let fixture: ComponentFixture<EditActionplansAssociationAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActionplansAssociationAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionplansAssociationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
