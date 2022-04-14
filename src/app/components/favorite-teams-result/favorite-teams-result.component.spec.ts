import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeamsResultComponent } from './favorite-teams-result.component';

describe('FavoriteTeamsResultComponent', () => {
  let component: FavoriteTeamsResultComponent;
  let fixture: ComponentFixture<FavoriteTeamsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTeamsResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTeamsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
