/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuItemSaleService } from './menuItemSale.service';

describe('Service: MenuItemSale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuItemSaleService]
    });
  });

  it('should ...', inject([MenuItemSaleService], (service: MenuItemSaleService) => {
    expect(service).toBeTruthy();
  }));
});
