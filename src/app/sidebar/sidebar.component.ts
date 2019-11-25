import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { UserService } from '../shared/userServices/user.service';
import { Router } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { GlobalService } from '../services/global.service';
// import { MenusService } from './menus.service';
var that;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  userName = '';  
  userSurName = '';
  constructor(public sidebarservice: SidebarService,public _userService : UserService,public _router : Router,public _globalService : GlobalService) {
    this.menus = sidebarservice.getMenuList();
  
    console.log(_userService)
    this.userName = _userService.userName
    this.userSurName = _userService.userSurname
    that=this;
   }

  ngOnInit() {
  }

  getSideBarState() {
   
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
   
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getReport(url)
  {
    this._globalService.setCurrentUrl("DailyReportSummary/")
    this._router.navigate(['/Layout/DailyReportSummary/']);
  }

  toggleSidebar() {
 
    // let audio = new Audio();
    // audio.src = "assets/audio/alarm.wav";
    // audio.load();
    // audio.play();
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getState(currentMenu) {
    
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {

    return this.sidebarservice.hasBackgroundImage;
  }

  logout() {
    var result = confirm("Sistemden Çıkış Yapmak İstediğinize Emin misiniz?","Çıkış");    
    result.then(function (dialogResult) {
      if (dialogResult) 
      {
        that._userService.logout();
        that._router.navigate(['/Login']);
      }      
    })
  
  }

}
