import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberBaselineEnterpriseComponent } from './edit-member-baseline-enterprise.component';

describe('EditMemberBaselineEnterpriseComponent', () => {
  let component: EditMemberBaselineEnterpriseComponent;
  let fixture: ComponentFixture<EditMemberBaselineEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemberBaselineEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberBaselineEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
