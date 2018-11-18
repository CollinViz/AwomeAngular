import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntrepreneurComponent } from './list-entrepreneur.component';

describe('ListEntrepreneurComponent', () => {
  let component: ListEntrepreneurComponent;
  let fixture: ComponentFixture<ListEntrepreneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntrepreneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
