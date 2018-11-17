import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerNumberVsEmployeeNumbersComponent } from './owner-number-vs-employee-numbers.component';

describe('OwnerNumberVsEmployeeNumbersComponent', () => {
  let component: OwnerNumberVsEmployeeNumbersComponent;
  let fixture: ComponentFixture<OwnerNumberVsEmployeeNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerNumberVsEmployeeNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerNumberVsEmployeeNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
