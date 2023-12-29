import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchmovieComponent } from './watchmovie.component';

describe('WatchmovieComponent', () => {
  let component: WatchmovieComponent;
  let fixture: ComponentFixture<WatchmovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchmovieComponent]
    });
    fixture = TestBed.createComponent(WatchmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
