import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitsEnterpriseEnterpriseComponent } from './search-visits-enterprise-enterprise.component';

describe('SearchVisitsEnterpriseEnterpriseComponent', () => {
  let component: SearchVisitsEnterpriseEnterpriseComponent;
  let fixture: ComponentFixture<SearchVisitsEnterpriseEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVisitsEnterpriseEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVisitsEnterpriseEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
