import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComEditActionPlansActivityComponent } from './com-edit-action-plans-activity.component';

describe('ComEditActionPlansActivityComponent', () => {
  let component: ComEditActionPlansActivityComponent;
  let fixture: ComponentFixture<ComEditActionPlansActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComEditActionPlansActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComEditActionPlansActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
