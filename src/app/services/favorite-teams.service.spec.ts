import { TestBed } from '@angular/core/testing';

import { FavoriteTeamsService } from './favorite-teams.service';

describe('FavoriteTeamsService', () => {
  let service: FavoriteTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
