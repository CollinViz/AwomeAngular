import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionplansEnterprisesPageComponent } from './actionplans-enterprises-page.component';

describe('ActionplansEnterprisesPageComponent', () => {
  let component: ActionplansEnterprisesPageComponent;
  let fixture: ComponentFixture<ActionplansEnterprisesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionplansEnterprisesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionplansEnterprisesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
