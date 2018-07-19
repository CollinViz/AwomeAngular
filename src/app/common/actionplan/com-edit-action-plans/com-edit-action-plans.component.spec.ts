import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComEditActionPlansComponent } from './com-edit-action-plans.component';

describe('ComEditActionPlansComponent', () => {
  let component: ComEditActionPlansComponent;
  let fixture: ComponentFixture<ComEditActionPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComEditActionPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComEditActionPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
