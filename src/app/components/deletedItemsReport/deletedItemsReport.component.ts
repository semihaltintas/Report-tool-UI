import { Component, OnInit } from '@angular/core';
import Form from "devextreme/ui/form";
import notify from 'devextreme/ui/notify';
import { DeletedItemService } from './service/deletedItem.service';
import { deletedItemDetail } from './model/deletedItemsModel';
import { Router, ActivatedRoute } from '@angular/router';
import { requestModel } from '../../models/globalModel';
import { UserService } from 'src/app/shared/userServices/user.service';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-deletedItemsReport',
  templateUrl: './deletedItemsReport.component.html',
  styleUrls: ['./deletedItemsReport.component.scss']
})
export class DeletedItemsReportComponent implements OnInit {
  loadingVisible = false;
  reqModel: requestModel;
  reason = ''
  deletedItemsDetailData: deletedItemDetail[];
  constructor(public _deletedItemService: DeletedItemService, public _router: Router, public route: ActivatedRoute, public _userService: UserService,public _globalService : GlobalService) {
    this.route.queryParams.subscribe(params => {
      debugger
      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      this.reason = this._globalService.reason;
      if (this.reqModel.startedDate != null) {
        this.getItemDetail()
      }      
    })
  }

  ngOnInit() {
  }


  getItemDetail()
  {
    this.loadingVisible = true
    this._deletedItemService.getDeletedItemsByReason(this.reqModel,this.reason,this._userService.userLicances[0].licanceId).subscribe(result => {
      this.deletedItemsDetailData = result as deletedItemDetail[]  
      console.log(this.deletedItemsDetailData)   
      this.loadingVisible = false
  })
  }

  getFolioDetail(e){
    console.log(e)
    this._globalService.setCurrentUrl("FolioDetail/")
   this._router.navigate(['/Layout/' +  this._globalService.getCurrentUrl()],{ queryParams: { folioNo:e}, skipLocationChange: true });
  }

}
