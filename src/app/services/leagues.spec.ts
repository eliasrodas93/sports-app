import { TestBed } from '@angular/core/testing';

import { LeaguesService } from './leagues-service';

describe('Leagues', () => {
  let service: LeaguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
