import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditenterpriseEnterpriseComponent } from './editenterprise-enterprise.component';

describe('EditenterpriseEnterpriseComponent', () => {
  let component: EditenterpriseEnterpriseComponent;
  let fixture: ComponentFixture<EditenterpriseEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditenterpriseEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditenterpriseEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
