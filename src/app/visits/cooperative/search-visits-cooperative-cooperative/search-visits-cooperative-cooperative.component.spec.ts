import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitsCooperativeCooperativeComponent } from './search-visits-cooperative-cooperative.component';

describe('SearchVisitsCooperativeCooperativeComponent', () => {
  let component: SearchVisitsCooperativeCooperativeComponent;
  let fixture: ComponentFixture<SearchVisitsCooperativeCooperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVisitsCooperativeCooperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVisitsCooperativeCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
