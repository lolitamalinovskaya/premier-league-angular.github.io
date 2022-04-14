import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeamsFixturesComponent } from './favorite-teams-fixtures.component';

describe('FavoriteTeamsFixturesComponent', () => {
  let component: FavoriteTeamsFixturesComponent;
  let fixture: ComponentFixture<FavoriteTeamsFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTeamsFixturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTeamsFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
