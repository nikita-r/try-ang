import { TestBed } from '@angular/core/testing';

import { AdventureWorksService } from './adventure-works.service';

describe('AdventureWorksService', () => {
  let service: AdventureWorksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventureWorksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
