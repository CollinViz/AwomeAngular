import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComListActionPlansActivityComponent } from './com-list-action-plans-activity.component';

describe('ComListActionPlansActivityComponent', () => {
  let component: ComListActionPlansActivityComponent;
  let fixture: ComponentFixture<ComListActionPlansActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComListActionPlansActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComListActionPlansActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
