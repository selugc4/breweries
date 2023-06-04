import { TestBed } from '@angular/core/testing';

import { LocalBreweriesApiService } from './local-breweries-api.service';

describe('LocalBreweriesApiService', () => {
  let service: LocalBreweriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalBreweriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
