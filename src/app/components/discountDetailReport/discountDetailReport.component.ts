import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel } from 'src/app/models/globalModel';
import { DiscountSummaryReportService } from '../discountSummaryReport/service/discountSummaryReport.service';
import { UserService } from 'src/app/shared/userServices/user.service';
import { discountDetailModel } from './models/discountDetailModel';

@Component({
  selector: 'app-discountDetailReport',
  templateUrl: './discountDetailReport.component.html',
  styleUrls: ['./discountDetailReport.component.scss']
})
export class DiscountDetailReportComponent implements OnInit {
 reqModel : requestModel;
 loadingVisible = false;
 discountDetailListModel : discountDetailModel[];
 reason = "";
  constructor(public _globalService : GlobalService,public route : ActivatedRoute,public _service : DiscountSummaryReportService,public _userService : UserService,public _router : Router) { 
    this.route.queryParams.subscribe(params => {

      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      this.reason = params["reason"];
      if (this.reqModel.startedDate != null) {
        this.loadingVisible = true;
        this.getDiscountDetailReport();
      }
    })
  }

  getDiscountDetailReport()
  {    
    this._service.getDiscountDetailReport(this.reqModel,this.reason,this._userService.userLicances[0].licanceId).subscribe(result => {
      this.discountDetailListModel = result as discountDetailModel[];
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

}
