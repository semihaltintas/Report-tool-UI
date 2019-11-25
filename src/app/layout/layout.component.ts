import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../shared/userServices/user.service';
import { Routes, RouterModule, Router } from '@angular/router';
var that;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menus = [];
  itemsDemo: any[];
  constructor(public sidebarservice : SidebarService, public translate: TranslateService, public _userService: UserService, private _router: Router) { 
    
    this.menus = sidebarservice.getMenuList();
    translate.setDefaultLang('tr');
    that = this;
    this.itemsDemo = [{ text: 'Yeni Sekmede Aç' }];
    this.rememberMe();
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  rememberMe() {
    this._userService.rememberMe();
  }


}
