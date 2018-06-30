import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitsAssociationAssociationComponent } from './search-visits-association-association.component';

describe('SearchVisitsAssociationAssociationComponent', () => {
  let component: SearchVisitsAssociationAssociationComponent;
  let fixture: ComponentFixture<SearchVisitsAssociationAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVisitsAssociationAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVisitsAssociationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
