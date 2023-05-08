import { TestBed } from '@angular/core/testing';

import { MockScrapperService } from './mock-scrapper.service';

describe('MockScrapperService', () => {
  let service: MockScrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockScrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
