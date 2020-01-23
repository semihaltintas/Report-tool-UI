import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel } from 'src/app/models/globalModel';
import { Router, ActivatedRoute } from '@angular/router';
import { menuItemSaleModel } from 'src/app/components/menuItemSaleReport/models/menuItemSaaleModel'
import { apiUrls } from 'src/app/enums/serviceUrls';
import { UserService } from 'src/app/shared/userServices/user.service';
import {ExcelService} from 'src/app/services/excel.service'
@Component({
  selector: 'app-menuItemFolioList',
  templateUrl: './menuItemFolioList.component.html',
  styleUrls: ['./menuItemFolioList.component.scss']
})
export class MenuItemFolioListComponent implements OnInit {
  loadingVisible = false;
  reqModel: requestModel;
  parameter :string
  parameter1 :string
  // deletedItemsDetailData: deletedItemDetail[];
  menuItemSaleData : menuItemSaleModel[];
  mostSaleItemData : menuItemSaleModel[];
  constructor(public _ExcelService:ExcelService,public _router: Router,public _globalService : GlobalService,public route : ActivatedRoute,public _userService : UserService) {
    this.route.queryParams.subscribe(params => {

      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"]; 
      this.reqModel.groupType = params["groupType"]; 
      if (this.reqModel.startedDate != null)
      {
        this.getItemSaleData();
        //this.getMostSaleItemsData();
      }
    })

   }

   getItemSaleData()
   {
     debugger
    this.loadingVisible = true;
    this.parameter = this.reqModel.groupType
    this.parameter1 = "folioList"
    // console.log(this)
    this._globalService.getReportData(this.reqModel, apiUrls.getMenuItemReport, this._userService.userLicances[0].licanceId, this.parameter,this.parameter1).subscribe(result => {
      this.menuItemSaleData = result as menuItemSaleModel[];
      // var groupBy =  this.arrayGroupBy()

      this.loadingVisible = false;
     })
   }

   getFolioDetail(e)
   {
     this._globalService.setCurrentUrl("DailyReportSummary/FolioDetail/")
     this._router.navigate(['/Layout/' +  this._globalService.getCurrentUrl()],{ queryParams: { folioNo:e , startedDate:this.reqModel.startedDate,endDate:this.reqModel.endDate,branchCode:this.reqModel.branchCode}, skipLocationChange: true });
   }
 

  ngOnInit() {
  }
  ExportTOExcel():void {
    debugger
    var excelName = this._globalService.getExcelFileName("Menü Kalemi Satış Özeti Raporu",this.reqModel.startedDate,this.reqModel.endDate)
    this._ExcelService.exportAsExcelFile(this.menuItemSaleData,excelName);
  }
}
