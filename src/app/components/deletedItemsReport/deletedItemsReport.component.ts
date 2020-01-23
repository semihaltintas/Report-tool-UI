import { Component, OnInit } from '@angular/core';
import Form from "devextreme/ui/form";
import notify from 'devextreme/ui/notify';
import { DeletedItemService } from './service/deletedItem.service';
import { deletedItemDetail } from './model/deletedItemsModel';
import { Router, ActivatedRoute } from '@angular/router';
import { requestModel } from '../../models/globalModel';
import { UserService } from 'src/app/shared/userServices/user.service';
import { GlobalService } from 'src/app/services/global.service';
import {ExcelService} from 'src/app/services/excel.service'


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
  constructor(public _ExcelService:ExcelService,public _deletedItemService: DeletedItemService, public _router: Router, public route: ActivatedRoute, public _userService: UserService,public _globalService : GlobalService) {
    this.route.queryParams.subscribe(params => {

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
    
      this.loadingVisible = false
  })
  }

  getFolioDetail(e){

    this._globalService.setCurrentUrl("DailyReportSummary/FolioDetail/")
   this._router.navigate(['/Layout/' +  this._globalService.getCurrentUrl()],{ queryParams: { folioNo:e, startedDate:this.reqModel.startedDate,endDate:this.reqModel.endDate,branchCode:this.reqModel.branchCode}, skipLocationChange: true });
  }
  ExportTOExcel():void {
    debugger
    var excelName = this._globalService.getExcelFileName("Silinen Ürün Raporu",this.reqModel.startedDate,this.reqModel.endDate)
    this._ExcelService.exportAsExcelFile(this.deletedItemsDetailData,excelName);
  }

}
