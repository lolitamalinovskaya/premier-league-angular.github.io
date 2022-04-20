import { TestBed } from '@angular/core/testing';

import { CreateNewPlayerService } from './create-new-player.service';

describe('CreateNewPlayerService', () => {
  let service: CreateNewPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
