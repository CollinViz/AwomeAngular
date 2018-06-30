import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenBootUiComponent } from './gen-boot-ui.component';

describe('GenBootUiComponent', () => {
  let component: GenBootUiComponent;
  let fixture: ComponentFixture<GenBootUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenBootUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenBootUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
