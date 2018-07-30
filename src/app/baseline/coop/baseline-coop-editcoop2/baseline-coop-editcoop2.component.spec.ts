import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineCoopEditcoop2Component } from './baseline-coop-editcoop2.component';

describe('BaselineCoopEditcoop2Component', () => {
  let component: BaselineCoopEditcoop2Component;
  let fixture: ComponentFixture<BaselineCoopEditcoop2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineCoopEditcoop2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineCoopEditcoop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
