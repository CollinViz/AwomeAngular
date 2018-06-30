import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBaselineCooperativeCooperativeComponent } from './search-baseline-cooperative-cooperative.component';

describe('SearchBaselineCooperativeCooperativeComponent', () => {
  let component: SearchBaselineCooperativeCooperativeComponent;
  let fixture: ComponentFixture<SearchBaselineCooperativeCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBaselineCooperativeCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBaselineCooperativeCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
