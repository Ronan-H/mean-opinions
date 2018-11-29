import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollSummaryComponent } from './poll-summary.component';

describe('PollSummaryComponent', () => {
  let component: PollSummaryComponent;
  let fixture: ComponentFixture<PollSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
