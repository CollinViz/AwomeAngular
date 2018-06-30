import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActionplansAssociationAssociationComponent } from './search-actionplans-association-association.component';

describe('SearchActionplansAssociationAssociationComponent', () => {
  let component: SearchActionplansAssociationAssociationComponent;
  let fixture: ComponentFixture<SearchActionplansAssociationAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchActionplansAssociationAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActionplansAssociationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
