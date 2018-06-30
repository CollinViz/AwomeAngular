import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionplansEnterprisesEnterprisesComponent } from './edit-actionplans-enterprises-enterprises.component';

describe('EditActionplansEnterprisesEnterprisesComponent', () => {
  let component: EditActionplansEnterprisesEnterprisesComponent;
  let fixture: ComponentFixture<EditActionplansEnterprisesEnterprisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActionplansEnterprisesEnterprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionplansEnterprisesEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
