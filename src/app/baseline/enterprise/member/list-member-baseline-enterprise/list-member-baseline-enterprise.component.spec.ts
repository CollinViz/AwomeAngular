import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemberBaselineEnterpriseComponent } from './list-member-baseline-enterprise.component';

describe('ListMemberBaselineEnterpriseComponent', () => {
  let component: ListMemberBaselineEnterpriseComponent;
  let fixture: ComponentFixture<ListMemberBaselineEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMemberBaselineEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMemberBaselineEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
