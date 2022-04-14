import { TestBed } from '@angular/core/testing';

import { FavoriteTeamsFixturesService } from './favorite-teams-fixtures.service';

describe('FavoriteTeamsFixturesService', () => {
  let service: FavoriteTeamsFixturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteTeamsFixturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
