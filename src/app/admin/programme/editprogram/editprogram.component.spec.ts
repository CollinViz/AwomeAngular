import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprogramComponent } from './editprogram.component';

describe('EditprogramComponent', () => {
  let component: EditprogramComponent;
  let fixture: ComponentFixture<EditprogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
