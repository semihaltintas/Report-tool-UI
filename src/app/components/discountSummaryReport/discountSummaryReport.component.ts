import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { requestModel } from 'src/app/models/globalModel';
import { GlobalService } from 'src/app/services/global.service';
import { DiscountSummaryReportService } from './service/discountSummaryReport.service';
import { UserService } from 'src/app/shared/userServices/user.service';
import { discountSummaryModel } from './models/discountSummaryModel';
import {ExcelService} from 'src/app/services/excel.service'

@Component({
  selector: 'app-discountSummaryReport',
  templateUrl: './discountSummaryReport.component.html',
  styleUrls: ['./discountSummaryReport.component.scss']
})
export class DiscountSummaryReportComponent implements OnInit {
  
  reqModel: requestModel;
  loadingVisible = false;
  discountSummaryListModel: discountSummaryModel[];
  constructor(public _ExcelService : ExcelService,public route: ActivatedRoute, public _globalService: GlobalService, public _service: DiscountSummaryReportService, public _userService: UserService,public _router : Router) {
    this.route.queryParams.subscribe(params => {

      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      if (this.reqModel.startedDate != null) {
        this.loadingVisible = true;
        this.getDiscountSummaryReport();
      }
    })
  }

  ngOnInit() {
  }

  getDiscountSummaryReport() {
    this._service.getDiscountSummaryReport(this.reqModel, this._userService.userLicances[0].licanceId).subscribe(result => {
      this.discountSummaryListModel = result as discountSummaryModel[];
      this.loadingVisible = false;
    })
  }

  getDiscountDetail(e)
  {
    
    this._globalService.setCurrentUrl("DailyReportSummary/DiscountDetailReport/")
  this._router.navigate(['/Layout/' +  this._globalService.getCurrentUrl()],{ queryParams: { startedDate:this.reqModel.startedDate,endDate:this.reqModel.endDate,branchCode:this.reqModel.branchCode,reason: e}, skipLocationChange: true });
  }

  ExportTOExcel():void {
    debugger
    var excelName = this._globalService.getExcelFileName("İndirim Özet Raporu",this.reqModel.startedDate,this.reqModel.endDate)
    this._ExcelService.exportAsExcelFile(this.discountSummaryListModel,excelName);
  }

}
