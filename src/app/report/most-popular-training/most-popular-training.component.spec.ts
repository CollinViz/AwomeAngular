import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularTrainingComponent } from './most-popular-training.component';

describe('MostPopularTrainingComponent', () => {
  let component: MostPopularTrainingComponent;
  let fixture: ComponentFixture<MostPopularTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPopularTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
