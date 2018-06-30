import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActionplansCooperativesCooperativesComponent } from './search-actionplans-cooperatives-cooperatives.component';

describe('SearchActionplansCooperativesCooperativesComponent', () => {
  let component: SearchActionplansCooperativesCooperativesComponent;
  let fixture: ComponentFixture<SearchActionplansCooperativesCooperativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchActionplansCooperativesCooperativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActionplansCooperativesCooperativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
