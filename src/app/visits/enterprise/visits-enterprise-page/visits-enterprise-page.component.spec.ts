import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsEnterprisePageComponent } from './visits-enterprise-page.component';

describe('VisitsEnterprisePageComponent', () => {
  let component: VisitsEnterprisePageComponent;
  let fixture: ComponentFixture<VisitsEnterprisePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsEnterprisePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsEnterprisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
