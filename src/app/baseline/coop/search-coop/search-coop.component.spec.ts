import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoopComponent } from './search-coop.component';

describe('SearchCoopComponent', () => {
  let component: SearchCoopComponent;
  let fixture: ComponentFixture<SearchCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
