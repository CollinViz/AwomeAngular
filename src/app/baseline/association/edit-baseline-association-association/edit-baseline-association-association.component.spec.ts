import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaselineAssociationAssociationComponent } from './edit-baseline-association-association.component';

describe('EditBaselineAssociationAssociationComponent', () => {
  let component: EditBaselineAssociationAssociationComponent;
  let fixture: ComponentFixture<EditBaselineAssociationAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBaselineAssociationAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBaselineAssociationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
