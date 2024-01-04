import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsserieComponent } from './reviewsserie.component';

describe('ReviewsserieComponent', () => {
  let component: ReviewsserieComponent;
  let fixture: ComponentFixture<ReviewsserieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsserieComponent]
    });
    fixture = TestBed.createComponent(ReviewsserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
