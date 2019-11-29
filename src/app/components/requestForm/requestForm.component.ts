import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel, branchModel } from 'src/app/models/globalModel';
import { UserService } from 'src/app/shared/userServices/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Form from "devextreme/ui/form";
import notify from 'devextreme/ui/notify';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-requestForm',
  templateUrl: './requestForm.component.html',
  styleUrls: ['./requestForm.component.scss']
})
export class RequestFormComponent implements OnInit {
  colCountByScreen :Object;
  requestForm : requestModel;
  branchList : branchModel[];
  reportTitle = ''
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  reqModel: requestModel;
  pathReplace :string
  constructor(public _globalService : GlobalService, public route: ActivatedRoute,public _userServices : UserService,public _router : Router , private menuService: MenuService) {
    this.getBranchList()

    this.requestForm = _globalService.getNewRequstModel();
    this.colCountByScreen = {
      lg: 3,
      md: 3,
      sm: 1,
      xs: 1
    };

    this.route.queryParams.subscribe(params => {

      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      this.menu = this.menuService.getMenu();
      this.listenRouting();
      
    })
   }

   
   screen(width) {
    return width < 720 ? "sm" : "md";
  }
  valueChanged(e) {
    if (e.value) {
      this.colCountByScreen = {
        md: 3,
        sm: 1
      }
    } else {
      this.colCountByScreen = null;
    }
  }
  getBranchList()
{  
  this._globalService.getBranchList(this._userServices.userLicances[0].licanceId).subscribe(result => {
    this.branchList = result
  } )
}

getReportData()
{
  // this.reportTitle = "SEMİH"
  let element = document.getElementById("myForm");
  let instance = Form.getInstance(element) as Form;
  var validResult = instance.validate();

  if (!validResult.isValid) {     
    notify({
      message: "Uyarı. Lütfen Eksik Alanları Doldurunuz.",
      position: { 
          my: "center top",
          at: "center top"
      }
    }, "error", 2000);
    return
  }
  this._globalService.setCurrentUrl("DailyReportSummary/")
  this._router.navigate(['/Layout/' + this._globalService.url],{ queryParams: { startedDate:this.requestForm.startedDate,endDate:this.requestForm.endDate,branchCode:this.requestForm.branchCode}, skipLocationChange: true });
}

  ngOnInit() {
    this.menu = this.menuService.getMenu();
      this.listenRouting();
  }
  listenRouting() {
      debugger
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        // 初始化breadcrumb
        target = this.menu;
        this.breadcrumbList.length = 0;
        // 取得目前routing url用/區格, [0]=第一層, [1]=第二層 ...etc
        routerList = routerUrl.slice(1).split('/');
        
        
        routerList.forEach((router, index) => {
          // 找到這一層在menu的路徑和目前routing相同的路徑
          target = target.find(page => page.path.slice(2) === router);
          // 存到breadcrumbList到時後直接loop這個list就是麵包屑了
         
          this.pathReplace = target.path
          this.pathReplace =  this.pathReplace.replace('/Layout','')
          this.breadcrumbList.push({
            name: target.name,
            // 第二層開始路由要加上前一層的routing, 用相對位置會造成routing錯誤
            path: (index === 0) ? this.pathReplace : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`,
            startedDate: target.startedDate,
            endDate : target.endDate,
            branchCode: target.branchCode
            
            
          });
       
          console.log(this.breadcrumbList)
          
          // 下一層要比對的目標是這一層指定的子頁面
          if (index+1 !== routerList.length) {
            target = target.children;
          }
        }
             
        
        );
        this.breadcrumbList.forEach((router, index) => {
          


        });
       
      }
    });
  }  
  

}
