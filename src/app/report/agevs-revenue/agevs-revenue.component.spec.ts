import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgevsRevenueComponent } from './agevs-revenue.component';

describe('AgevsRevenueComponent', () => {
  let component: AgevsRevenueComponent;
  let fixture: ComponentFixture<AgevsRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgevsRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgevsRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
