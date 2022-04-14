import { TestBed } from '@angular/core/testing';

import { FavoriteTeamsResultService } from './favorite-teams-result.service';

describe('FavoriteTeamsResultService', () => {
  let service: FavoriteTeamsResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteTeamsResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
