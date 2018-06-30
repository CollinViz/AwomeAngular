import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBaselineEntrepreneurEntrepreneurComponent } from './search-baseline-entrepreneur-entrepreneur.component';

describe('SearchBaselineEntrepreneurEntrepreneurComponent', () => {
  let component: SearchBaselineEntrepreneurEntrepreneurComponent;
  let fixture: ComponentFixture<SearchBaselineEntrepreneurEntrepreneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBaselineEntrepreneurEntrepreneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBaselineEntrepreneurEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
