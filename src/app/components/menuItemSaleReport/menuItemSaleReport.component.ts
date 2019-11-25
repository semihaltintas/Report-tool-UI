import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel } from 'src/app/models/globalModel';
import { Router, ActivatedRoute } from '@angular/router';
import { menuItemSaleModel } from './models/menuItemSaaleModel';
import {apiUrls} from '../../enums/serviceUrls';
import { UserService } from 'src/app/shared/userServices/user.service';

@Component({
  selector: 'app-menuItemSaleReport',
  templateUrl: './menuItemSaleReport.component.html',
  styleUrls: ['./menuItemSaleReport.component.scss']
})
export class MenuItemSaleReportComponent implements OnInit {
  loadingVisible = false;
  reqModel: requestModel;
  // deletedItemsDetailData: deletedItemDetail[];
  menuItemSaleData : menuItemSaleModel[];
  mostSaleItemData : menuItemSaleModel[];
  constructor(public _globalService : GlobalService,public route : ActivatedRoute,public _userService : UserService) {
    this.route.queryParams.subscribe(params => {
      debugger
      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];      
      if (this.reqModel.startedDate != null)
      {
        this.getItemSaleData();
        this.getMostSaleItemsData();
      }
    })

   }

   getItemSaleData()
   {
     this.loadingVisible = true;
     this._globalService.getReportData(this.reqModel,apiUrls.getMenuItemReport,this._userService.userLicances[0].licanceId).subscribe(result => {
      this.menuItemSaleData = result as menuItemSaleModel[];
      var groupBy =  this.arrayGroupBy()
      // console.log(groupBy.toArray());
      // console.log();
      this.loadingVisible = false;
     })
   }

   getMostSaleItemsData(){
     this._globalService.getReportData(this.reqModel,apiUrls.getBestSellerItemReport,this._userService.userLicances[0].licanceId).subscribe(result => {
       this.mostSaleItemData = result as menuItemSaleModel[];
       console.log(this.mostSaleItemData);
     })
   }

  arrayGroupBy() {
    return this.menuItemSaleData.reduce(function(rv, x) {
      debugger
      (rv[x['GRUPTURU']] = rv[x['GRUPTURU']] || []).push(x);
      return rv;
    }, {});
  };

  ngOnInit() {
  }

}
