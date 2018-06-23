import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenterpriseComponent } from './listenterprise.component';

describe('ListenterpriseComponent', () => {
  let component: ListenterpriseComponent;
  let fixture: ComponentFixture<ListenterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
