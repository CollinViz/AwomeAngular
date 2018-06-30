import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActionplansEnterprisesEnterprisesComponent } from './search-actionplans-enterprises-enterprises.component';

describe('SearchActionplansEnterprisesEnterprisesComponent', () => {
  let component: SearchActionplansEnterprisesEnterprisesComponent;
  let fixture: ComponentFixture<SearchActionplansEnterprisesEnterprisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchActionplansEnterprisesEnterprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActionplansEnterprisesEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
