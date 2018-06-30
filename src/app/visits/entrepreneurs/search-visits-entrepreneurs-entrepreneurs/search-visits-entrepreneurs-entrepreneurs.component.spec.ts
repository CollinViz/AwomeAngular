import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitsEntrepreneursEntrepreneursComponent } from './search-visits-entrepreneurs-entrepreneurs.component';

describe('SearchVisitsEntrepreneursEntrepreneursComponent', () => {
  let component: SearchVisitsEntrepreneursEntrepreneursComponent;
  let fixture: ComponentFixture<SearchVisitsEntrepreneursEntrepreneursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVisitsEntrepreneursEntrepreneursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVisitsEntrepreneursEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
