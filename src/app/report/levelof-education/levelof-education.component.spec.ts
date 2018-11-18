import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelofEducationComponent } from './levelof-education.component';

describe('LevelofEducationComponent', () => {
  let component: LevelofEducationComponent;
  let fixture: ComponentFixture<LevelofEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelofEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelofEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
