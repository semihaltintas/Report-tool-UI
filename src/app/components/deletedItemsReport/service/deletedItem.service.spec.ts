/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeletedItemService } from './deletedItem.service';

describe('Service: DeletedItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletedItemService]
    });
  });

  it('should ...', inject([DeletedItemService], (service: DeletedItemService) => {
    expect(service).toBeTruthy();
  }));
});
