import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfrmVisitsEnterpriseEnterpriseComponent } from './editfrm-visits-enterprise-enterprise.component';

describe('EditfrmVisitsEnterpriseEnterpriseComponent', () => {
  let component: EditfrmVisitsEnterpriseEnterpriseComponent;
  let fixture: ComponentFixture<EditfrmVisitsEnterpriseEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfrmVisitsEnterpriseEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfrmVisitsEnterpriseEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
