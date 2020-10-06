import { TestBed } from '@angular/core/testing';

import { TennantService } from './tennant.service';

describe('TennantService', () => {
  let service: TennantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TennantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
