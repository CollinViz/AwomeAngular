import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionplansCooperativesPageComponent } from './actionplans-cooperatives-page.component';

describe('ActionplansCooperativesPageComponent', () => {
  let component: ActionplansCooperativesPageComponent;
  let fixture: ComponentFixture<ActionplansCooperativesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionplansCooperativesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionplansCooperativesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
