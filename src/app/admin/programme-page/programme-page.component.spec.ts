import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammePageComponent } from './programme-page.component';

describe('ProgrammePageComponent', () => {
  let component: ProgrammePageComponent;
  let fixture: ComponentFixture<ProgrammePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
