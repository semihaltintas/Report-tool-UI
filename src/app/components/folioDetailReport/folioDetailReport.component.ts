import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { folioDetailModel } from '../folioDetailReport/models/folioDetailModel';
import { FolioDetailService } from './service/folioDetail.service';
import { UserService } from 'src/app/shared/userServices/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel } from 'src/app/models/globalModel';
import {ExcelService} from 'src/app/services/excel.service'

@Component({
  selector: 'app-folioDetailReport',
  templateUrl: './folioDetailReport.component.html',
  styleUrls: ['./folioDetailReport.component.scss']
})
export class FolioDetailReportComponent implements OnInit {
  folioNo = "";
  loadingVisible = false;
  folioDetailList: folioDetailModel[]
  reqModel: requestModel;
  constructor(
    public _ExcelService: ExcelService,
    public route: ActivatedRoute,
    public _service: FolioDetailService,
    public _userService: UserService,
    public _globalService : GlobalService) {
    this.route.queryParams.subscribe(params => {
      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      this.folioNo = params["folioNo"]
      if (this.folioNo != '') {
        this.loadingVisible = true;
        this.getFolioDetail()
      }
    })
  }

  ngOnInit() {
  }

  getFolioDetail() {
    this._service.getFolioDetailByFolioNo(this.folioNo, this._userService.userLicances[0].licanceId).subscribe(result => {
      this.folioDetailList = result as folioDetailModel[]
      this.loadingVisible= false;
    })
  
  }

  ExportTOExcel():void {
    debugger
    var excelName = this._globalService.getExcelFileName("Adisyon Detay Raporu "+ this.folioNo,this.reqModel.startedDate,this.reqModel.endDate)
    this._ExcelService.exportAsExcelFile(this.folioDetailList,excelName);
  }

}
