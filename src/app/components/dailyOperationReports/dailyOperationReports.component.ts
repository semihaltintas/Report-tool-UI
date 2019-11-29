import { Component, OnInit } from '@angular/core';
import { branchModel } from 'src/app/models/globalModel';
import { GlobalService } from 'src/app/services/global.service';
import { DailyOperationReportService } from './service/dailyOperationReport.service';
import { UserService } from 'src/app/shared/userServices/user.service';
import { requestModel } from '../../models/globalModel';
import Form from "devextreme/ui/form";
import notify from 'devextreme/ui/notify';
import { apiUrls } from 'src/app/enums/serviceUrls';
import { dailySummaryResponseModel } from './models/dailySummaryReportModel';
import { deletedItemModel, deletedItemDetail } from '../deletedItemsReport/model/deletedItemsModel';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dailyOperationReports',
  templateUrl: './dailyOperationReports.component.html',
  styleUrls: ['./dailyOperationReports.component.scss']
})
export class DailyOperationReportsComponent implements OnInit {
  branchList: branchModel[];
  requestForm: requestModel;
  colCountByScreen: Object;
  loadingVisible = false;
  isodd = false;
  reportData: dailySummaryResponseModel[];
  deletedItemsData: deletedItemModel[];
  deletedItemsDetailData: deletedItemDetail[];
  constructor(public _globalService: GlobalService, public _userServices: UserService, public _router: Router, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.requestForm = _globalService.getNewRequstModel();
      this.requestForm.startedDate = params["startedDate"];
      this.requestForm.endDate = params["endDate"];
      this.requestForm.branchCode = params["branchCode"];
      if (this.requestForm.startedDate != null) {
        this.getReportData()
        this.getDeletedItemsData()
      }


    })
    this.colCountByScreen = {
      lg: 3,
      md: 3,
      sm: 1,
      xs: 1
    };
  }
  ngOnInit() {
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

  getItemDetail(e) {
    this._globalService.setSelectedReason(e)
    this._globalService.setCurrentUrl("DailyReportSummary/DeletedItemReport/")
    this._router.navigate(['/Layout/' + this._globalService.getCurrentUrl()], { queryParams: { startedDate: this.requestForm.startedDate, endDate: this.requestForm.endDate, branchCode: this.requestForm.branchCode, reason: e }, skipLocationChange: true });
  }
  // 

  getManuSaleReport() {
    this._globalService.setCurrentUrl("DailyReportSummary/MenuItemSaleReport/")
    this._router.navigate(['/Layout/' + this._globalService.getCurrentUrl()], { queryParams: { startedDate: this.requestForm.startedDate, endDate: this.requestForm.endDate, branchCode: this.requestForm.branchCode }, skipLocationChange: true });
  }

  getDeletedItemsData() {
    this._globalService.getReportData(this.requestForm, apiUrls.getDeletedItemData, this._userServices.userLicances[0].licanceId).subscribe(result => {
      this.deletedItemsData = result as deletedItemModel[]

    })
  }

  public get changeOdd() {
    this.isodd = !this.isodd;
    return true;
  }


  getCompanyDiscountReport() {
    this._globalService.setCurrentUrl("DailyReportSummary/DiscountSummaryReport/")
    this._router.navigate(['/Layout/' + this._globalService.getCurrentUrl()], { queryParams: { startedDate: this.requestForm.startedDate, endDate: this.requestForm.endDate, branchCode: this.requestForm.branchCode }, skipLocationChange: true });
  }



  getReportData() {

    this.loadingVisible = true
    this._globalService.getReportData(this.requestForm, apiUrls.getDailyReport, this._userServices.userLicances[0].licanceId).subscribe(result => {
      this.reportData = result as dailySummaryResponseModel[]
      this.loadingVisible = false
    })



  }

}
