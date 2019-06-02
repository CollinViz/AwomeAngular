import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEntrepreneurSearchComponent } from './report-entrepreneur-search.component';

describe('ReportEntrepreneurSearchComponent', () => {
  let component: ReportEntrepreneurSearchComponent;
  let fixture: ComponentFixture<ReportEntrepreneurSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEntrepreneurSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEntrepreneurSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
