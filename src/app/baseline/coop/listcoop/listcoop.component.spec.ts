import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoopComponent } from './listcoop.component';

describe('ListcoopComponent', () => {
  let component: ListcoopComponent;
  let fixture: ComponentFixture<ListcoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
