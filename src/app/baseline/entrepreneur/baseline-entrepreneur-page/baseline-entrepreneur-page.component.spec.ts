import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineEntrepreneurPageComponent } from './baseline-entrepreneur-page.component';

describe('BaselineEntrepreneurPageComponent', () => {
  let component: BaselineEntrepreneurPageComponent;
  let fixture: ComponentFixture<BaselineEntrepreneurPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineEntrepreneurPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineEntrepreneurPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
