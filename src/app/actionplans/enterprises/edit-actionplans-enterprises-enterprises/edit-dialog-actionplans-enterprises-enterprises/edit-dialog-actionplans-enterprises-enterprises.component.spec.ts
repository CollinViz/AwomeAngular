import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogActionplansEnterprisesEnterprisesComponent } from './edit-dialog-actionplans-enterprises-enterprises.component';

describe('EditDialogActionplansEnterprisesEnterprisesComponent', () => {
  let component: EditDialogActionplansEnterprisesEnterprisesComponent;
  let fixture: ComponentFixture<EditDialogActionplansEnterprisesEnterprisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogActionplansEnterprisesEnterprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogActionplansEnterprisesEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
