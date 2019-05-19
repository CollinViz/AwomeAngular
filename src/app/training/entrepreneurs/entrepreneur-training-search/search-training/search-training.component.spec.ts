import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainingComponent } from './search-training.component';

describe('SearchTrainingComponent', () => {
  let component: SearchTrainingComponent;
  let fixture: ComponentFixture<SearchTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
