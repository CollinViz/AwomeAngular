import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogActionplansEnterprisesComponent } from './edit-dialog-actionplans-enterprises.component';

describe('EditDialogActionplansEnterprisesComponent', () => {
  let component: EditDialogActionplansEnterprisesComponent;
  let fixture: ComponentFixture<EditDialogActionplansEnterprisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogActionplansEnterprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogActionplansEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
