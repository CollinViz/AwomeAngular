import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurChallengesComponent } from './entrepreneur-challenges.component';

describe('EntrepreneurChallengesComponent', () => {
  let component: EntrepreneurChallengesComponent;
  let fixture: ComponentFixture<EntrepreneurChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
