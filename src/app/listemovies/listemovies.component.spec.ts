import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListemoviesComponent } from './listemovies.component';

describe('ListemoviesComponent', () => {
  let component: ListemoviesComponent;
  let fixture: ComponentFixture<ListemoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListemoviesComponent]
    });
    fixture = TestBed.createComponent(ListemoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
