import { TestBed } from '@angular/core/testing';

import { AWTableService } from './aw-table.service';

describe('AWTableService', () => {
  let service: AWTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AWTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
