import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineEnterpriseEditenterprise2Component } from './baseline-enterprise-editenterprise2.component';

describe('BaselineEnterpriseEditenterprise2Component', () => {
  let component: BaselineEnterpriseEditenterprise2Component;
  let fixture: ComponentFixture<BaselineEnterpriseEditenterprise2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineEnterpriseEditenterprise2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineEnterpriseEditenterprise2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
