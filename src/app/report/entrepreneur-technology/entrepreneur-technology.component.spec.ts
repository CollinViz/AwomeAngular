import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurTechnologyComponent } from './entrepreneur-technology.component';

describe('EntrepreneurTechnologyComponent', () => {
  let component: EntrepreneurTechnologyComponent;
  let fixture: ComponentFixture<EntrepreneurTechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurTechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
