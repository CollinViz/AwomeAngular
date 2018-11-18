import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingmorejobsComponent } from './creatingmorejobs.component';

describe('CreatingmorejobsComponent', () => {
  let component: CreatingmorejobsComponent;
  let fixture: ComponentFixture<CreatingmorejobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingmorejobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingmorejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
