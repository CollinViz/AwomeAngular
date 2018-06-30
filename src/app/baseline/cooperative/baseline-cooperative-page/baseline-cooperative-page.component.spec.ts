import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineCooperativePageComponent } from './baseline-cooperative-page.component';

describe('BaselineCooperativePageComponent', () => {
  let component: BaselineCooperativePageComponent;
  let fixture: ComponentFixture<BaselineCooperativePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineCooperativePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineCooperativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
