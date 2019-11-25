/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyOperationReportService } from './dailyOperationReport.service';

describe('Service: DailyOperationReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyOperationReportService]
    });
  });

  it('should ...', inject([DailyOperationReportService], (service: DailyOperationReportService) => {
    expect(service).toBeTruthy();
  }));
});
