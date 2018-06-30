import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitsEnterpriseEnterpriseComponent } from './edit-visits-enterprise-enterprise.component';

describe('EditVisitsEnterpriseEnterpriseComponent', () => {
  let component: EditVisitsEnterpriseEnterpriseComponent;
  let fixture: ComponentFixture<EditVisitsEnterpriseEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitsEnterpriseEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitsEnterpriseEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
