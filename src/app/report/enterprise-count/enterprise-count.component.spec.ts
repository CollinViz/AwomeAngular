import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCountComponent } from './enterprise-count.component';

describe('EnterpriseCountComponent', () => {
  let component: EnterpriseCountComponent;
  let fixture: ComponentFixture<EnterpriseCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
