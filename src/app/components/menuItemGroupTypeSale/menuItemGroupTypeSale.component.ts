import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel } from 'src/app/models/globalModel';
import { Router, ActivatedRoute } from '@angular/router';
import { menuItemSaleModel } from 'src/app/components/menuItemSaleReport/models/menuItemSaaleModel'
import { apiUrls } from 'src/app/enums/serviceUrls';
import { UserService } from 'src/app/shared/userServices/user.service';
import {ExcelService} from 'src/app/services/excel.service'
@Component({
  selector: 'app-menuItemGroupTypeSale',
  templateUrl: './menuItemGroupTypeSale.component.html',
  styleUrls: ['./menuItemGroupTypeSale.component.scss']
})
export class MenuItemGroupTypeSaleComponent implements OnInit {
  loadingVisible = false;
  reqModel: requestModel;
  parameter: string;
  // deletedItemsDetailData: deletedItemDetail[];
  menuItemSaleData: menuItemSaleModel[];
  mostSaleItemData: menuItemSaleModel[];
  requestForm: requestModel;
  constructor(public _ExcelService:ExcelService,public _router: Router, public _globalService: GlobalService, public route: ActivatedRoute, public _userService: UserService) {
    this.route.queryParams.subscribe(params => {

      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      if (this.reqModel.startedDate != null) {
        this.getItemSaleData();
        // this.getMostSaleItemsData();
      }
    })

  }

  getItemSaleData() {
    debugger
    this.loadingVisible = true;
    this.parameter = "groupType"
    // console.log(this)
    this._globalService.getReportData(this.reqModel, apiUrls.getMenuItemReport, this._userService.userLicances[0].licanceId, this.parameter,"").subscribe(result => {
      this.menuItemSaleData = result as menuItemSaleModel[];
      // var groupBy =  this.arrayGroupBy()

      this.loadingVisible = false;
    })
  }

  getMenuGroupSaleReport(branchCode,groupType) {
    debugger
    // console.log(this)
    this._globalService.setCurrentUrl("DailyReportSummary/MenuItemGroupTypeSale/MenuGroupSaleReport/")
    this._router.navigate(['/Layout/' + this._globalService.getCurrentUrl()], { queryParams: { startedDate: this.reqModel.startedDate, endDate: this.reqModel.endDate, branchCode: branchCode,groupType:groupType }, skipLocationChange: true });

  }
  ngOnInit() {
  }
  ExportTOExcel():void {
    debugger
    var excelName = this._globalService.getExcelFileName("Menü Kalemi Satış Özeti Raporu",this.reqModel.startedDate,this.reqModel.endDate)
    this._ExcelService.exportAsExcelFile(this.menuItemSaleData,excelName);
  }
}
