import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionplansAssociationPageComponent } from './actionplans-association-page.component';

describe('ActionplansAssociationPageComponent', () => {
  let component: ActionplansAssociationPageComponent;
  let fixture: ComponentFixture<ActionplansAssociationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionplansAssociationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionplansAssociationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
