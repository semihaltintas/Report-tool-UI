import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = false;
  menus = [
    {
      title: 'Raporlar',
      type: 'header'
    },
    {
      title: 'Günlük Operasyon Raporu',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      // badge: {
      //   text: '27',
      //   class: 'badge-success'
      // },
      submenus: [
        {
          title: 'Gün. Operasyon Özet Rap.',
          reportID: 1,
          url: "DailyReportSummary/"
        },
        // {
        //   title: 'Bekleyen Siparişler',         
        // },
        // // {
        // //   title: 'Hazırlanan Siparişler',
        // //   badge: {
        // //     text: '15',
        // //     class: 'badge-warning'
        // //   },        
        // // },
        // {
        //   title: 'Tamamlanan Siparişler',         
        // }
        // ,
        // {
        //   title: 'Teslim Edilen Siparişler',       
        // }
      ]
    },
  ];
  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }



  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
