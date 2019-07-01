import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurIncomeComponent } from './entrepreneur-income.component';

describe('EntrepreneurIncomeComponent', () => {
  let component: EntrepreneurIncomeComponent;
  let fixture: ComponentFixture<EntrepreneurIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
