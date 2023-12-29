import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritetvComponent } from './favoritetv.component';

describe('FavoritetvComponent', () => {
  let component: FavoritetvComponent;
  let fixture: ComponentFixture<FavoritetvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritetvComponent]
    });
    fixture = TestBed.createComponent(FavoritetvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
