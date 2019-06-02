import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnterpriseSearchComponent } from './report-enterprise-search.component';

describe('ReportEnterpriseSearchComponent', () => {
  let component: ReportEnterpriseSearchComponent;
  let fixture: ComponentFixture<ReportEnterpriseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEnterpriseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEnterpriseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
