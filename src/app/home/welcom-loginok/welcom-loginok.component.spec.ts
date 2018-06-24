import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomLoginokComponent } from './welcom-loginok.component';

describe('WelcomLoginokComponent', () => {
  let component: WelcomLoginokComponent;
  let fixture: ComponentFixture<WelcomLoginokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomLoginokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomLoginokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
