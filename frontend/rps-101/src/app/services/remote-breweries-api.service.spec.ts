import { TestBed } from '@angular/core/testing';

import { BreweriesApiService } from './remote-breweries-api.service';

describe('BreweriesApiService', () => {
  let service: BreweriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreweriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
