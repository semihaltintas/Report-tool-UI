import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service'
// import { requestModel } from 'src/app/models/globalModel';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // name: string;
  // menu: Array<any> = [];
  // breadcrumbList: Array<any> = [];
  // reqModel: requestModel;
  constructor(public _router: Router, private menuService: MenuService, public route: ActivatedRoute, public _globalService : GlobalService) {

    // this.route.queryParams.subscribe(params => {

    //   this.reqModel = _globalService.getNewRequstModel();
    //   this.reqModel.startedDate = params["startedDate"];
    //   this.reqModel.endDate = params["endDate"];
    //   this.reqModel.branchCode = params["branchCode"];
    //   this.menu = this.menuService.getMenu();
    //   this.listenRouting();
      
    // })
   }
  
  
  ngOnInit() {

  
      // this.menu = this.menuService.getMenu();
      // this.listenRouting();
      
    }
    
    // listenRouting() {
      
    //   let routerUrl: string, routerList: Array<any>, target: any;
    //   this._router.events.subscribe((router: any) => {
    //     routerUrl = router.urlAfterRedirects;
    //     if (routerUrl && typeof routerUrl === 'string') {
    //       // 初始化breadcrumb
    //       target = this.menu;
    //       this.breadcrumbList.length = 0;
    //       // 取得目前routing url用/區格, [0]=第一層, [1]=第二層 ...etc
    //       routerList = routerUrl.slice(1).split('/');
          
          
    //       routerList.forEach((router, index) => {
    //         // 找到這一層在menu的路徑和目前routing相同的路徑
    //         target = target.find(page => page.path.slice(2) === router);
    //         // 存到breadcrumbList到時後直接loop這個list就是麵包屑了
           
        
            
    //         this.breadcrumbList.push({
    //           name: target.name,
    //           // 第二層開始路由要加上前一層的routing, 用相對位置會造成routing錯誤
    //           path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`,
    //           startedDate: target.startedDate,
    //           endDate : target.endDate,
    //           branchCode: target.branchCode
              
              
    //         });
           
    //        // {startedDate:'this.requestForm.startedDate', endDate : 'this.requestForm.endDate', branchCode : 'this.requestForm.branchCode' }
    //       //   switch(target.path) { 
    //       //     case "./Layout": { 
    //       //       target.path = "./Layout/DailyReportSummary" 
    //       //        break; 
    //       //     } 
    //       //     case "./Layout/DailyReportSummary": { 
    //       //        target.path = "." + this._globalService.urlString
    //       //        break; 
    //       //     } 
    //       //     default: { 
    //       //        //statements; 
    //       //        break; 
    //       //     } 
    //       //  }
    //         console.log(this.breadcrumbList)
            
    //         // 下一層要比對的目標是這一層指定的子頁面
    //         if (index+1 !== routerList.length) {
    //           target = target.children;
    //         }
    //       });
  
         
    //     }
    //   });
    // }  
  }
