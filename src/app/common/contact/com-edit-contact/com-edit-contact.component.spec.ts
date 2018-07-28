import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComEditContactComponent } from './com-edit-contact.component';

describe('ComEditContactComponent', () => {
  let component: ComEditContactComponent;
  let fixture: ComponentFixture<ComEditContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComEditContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
