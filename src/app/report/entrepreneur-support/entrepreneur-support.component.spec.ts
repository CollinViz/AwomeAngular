import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurSupportComponent } from './entrepreneur-support.component';

describe('EntrepreneurSupportComponent', () => {
  let component: EntrepreneurSupportComponent;
  let fixture: ComponentFixture<EntrepreneurSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
