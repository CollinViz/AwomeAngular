import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBaselineAssociationAssociationComponent } from './search-baseline-association-association.component';

describe('SearchBaselineAssociationAssociationComponent', () => {
  let component: SearchBaselineAssociationAssociationComponent;
  let fixture: ComponentFixture<SearchBaselineAssociationAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBaselineAssociationAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBaselineAssociationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
