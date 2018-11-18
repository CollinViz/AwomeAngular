import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByProvinceComponent } from './search-by-province.component';

describe('SearchByProvinceComponent', () => {
  let component: SearchByProvinceComponent;
  let fixture: ComponentFixture<SearchByProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
