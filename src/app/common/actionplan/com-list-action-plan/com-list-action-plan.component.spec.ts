import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComListActionPlanComponent } from './com-list-action-plan.component';

describe('ComListActionPlanComponent', () => {
  let component: ComListActionPlanComponent;
  let fixture: ComponentFixture<ComListActionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComListActionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComListActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
