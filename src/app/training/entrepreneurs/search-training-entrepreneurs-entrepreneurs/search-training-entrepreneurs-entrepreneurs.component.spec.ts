import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainingEntrepreneursEntrepreneursComponent } from './search-training-entrepreneurs-entrepreneurs.component';

describe('SearchTrainingEntrepreneursEntrepreneursComponent', () => {
  let component: SearchTrainingEntrepreneursEntrepreneursComponent;
  let fixture: ComponentFixture<SearchTrainingEntrepreneursEntrepreneursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTrainingEntrepreneursEntrepreneursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTrainingEntrepreneursEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
