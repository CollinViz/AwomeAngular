import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEntrepreneurComponent } from './search-entrepreneur.component';

describe('SearchEntrepreneurComponent', () => {
  let component: SearchEntrepreneurComponent;
  let fixture: ComponentFixture<SearchEntrepreneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEntrepreneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
