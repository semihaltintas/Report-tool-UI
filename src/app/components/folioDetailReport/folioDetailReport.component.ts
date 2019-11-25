import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { folioDetailModel } from '../folioDetailReport/models/folioDetailModel';
import { FolioDetailService } from './service/folioDetail.service';
import { UserService } from 'src/app/shared/userServices/user.service';


@Component({
  selector: 'app-folioDetailReport',
  templateUrl: './folioDetailReport.component.html',
  styleUrls: ['./folioDetailReport.component.scss']
})
export class FolioDetailReportComponent implements OnInit {
  folioNo = "";
  loadingVisible = false;
  folioDetailList: folioDetailModel[]
  constructor(
    public route: ActivatedRoute,
    public _service: FolioDetailService,
    public _userService: UserService) {
    this.route.queryParams.subscribe(params => {
      debugger
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
    debugger
    this._service.getFolioDetailByFolioNo(this.folioNo, this._userService.userLicances[0].licanceId).subscribe(result => {
      this.folioDetailList = result as folioDetailModel[]
      this.loadingVisible= false;
    })
  }

}
