import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoopCoopComponent } from './editcoop-coop.component';

describe('EditcoopCoopComponent', () => {
  let component: EditcoopCoopComponent;
  let fixture: ComponentFixture<EditcoopCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcoopCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcoopCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
