import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineAssociationPageComponent } from './baseline-association-page.component';

describe('BaselineAssociationPageComponent', () => {
  let component: BaselineAssociationPageComponent;
  let fixture: ComponentFixture<BaselineAssociationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineAssociationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineAssociationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
