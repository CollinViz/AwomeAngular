import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkshopsEntrepreneursEntrepreneursComponent } from './search-workshops-entrepreneurs-entrepreneurs.component';

describe('SearchWorkshopsEntrepreneursEntrepreneursComponent', () => {
  let component: SearchWorkshopsEntrepreneursEntrepreneursComponent;
  let fixture: ComponentFixture<SearchWorkshopsEntrepreneursEntrepreneursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWorkshopsEntrepreneursEntrepreneursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWorkshopsEntrepreneursEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
