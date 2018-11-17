import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationvsRevenueComponent } from './educationvs-revenue.component';

describe('EducationvsRevenueComponent', () => {
  let component: EducationvsRevenueComponent;
  let fixture: ComponentFixture<EducationvsRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationvsRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationvsRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
