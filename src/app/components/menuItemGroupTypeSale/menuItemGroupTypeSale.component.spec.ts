/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuItemGroupTypeSaleComponent } from './menuItemGroupTypeSale.component';

describe('MenuItemGroupTypeSaleComponent', () => {
  let component: MenuItemGroupTypeSaleComponent;
  let fixture: ComponentFixture<MenuItemGroupTypeSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemGroupTypeSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemGroupTypeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
