/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscountSummaryReportService } from './discountSummaryReport.service';

describe('Service: DiscountSummaryReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountSummaryReportService]
    });
  });

  it('should ...', inject([DiscountSummaryReportService], (service: DiscountSummaryReportService) => {
    expect(service).toBeTruthy();
  }));
});
