import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsAssociationPageComponent } from './visits-association-page.component';

describe('VisitsAssociationPageComponent', () => {
  let component: VisitsAssociationPageComponent;
  let fixture: ComponentFixture<VisitsAssociationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsAssociationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsAssociationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
