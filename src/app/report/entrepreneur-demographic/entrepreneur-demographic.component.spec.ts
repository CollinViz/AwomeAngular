import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurDemographicComponent } from './entrepreneur-demographic.component';

describe('EntrepreneurDemographicComponent', () => {
  let component: EntrepreneurDemographicComponent;
  let fixture: ComponentFixture<EntrepreneurDemographicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurDemographicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurDemographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
