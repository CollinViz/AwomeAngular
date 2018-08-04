import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoopComponent } from './editcoop.component';

describe('EditcoopComponent', () => {
  let component: EditcoopComponent;
  let fixture: ComponentFixture<EditcoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
