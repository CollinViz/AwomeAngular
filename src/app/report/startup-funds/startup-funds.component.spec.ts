import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupFundsComponent } from './startup-funds.component';

describe('StartupFundsComponent', () => {
  let component: StartupFundsComponent;
  let fixture: ComponentFixture<StartupFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
