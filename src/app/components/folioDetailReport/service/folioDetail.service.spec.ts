/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FolioDetailService } from './folioDetail.service';

describe('Service: FolioDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FolioDetailService]
    });
  });

  it('should ...', inject([FolioDetailService], (service: FolioDetailService) => {
    expect(service).toBeTruthy();
  }));
});
