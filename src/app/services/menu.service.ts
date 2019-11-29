import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import { requestModel } from 'src/app/models/globalModel';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  url: any;
  reqModel: requestModel;
  reason : any
  folioNo : any
  tree: any


  constructor(public _router: Router, public route: ActivatedRoute, public _globalService: GlobalService, private serializer: UrlSerializer) {
    this.route.queryParams.subscribe(params => {
      this.reqModel = _globalService.getNewRequstModel();
      this.reqModel.startedDate = params["startedDate"];
      this.reqModel.endDate = params["endDate"];
      this.reqModel.branchCode = params["branchCode"];
      debugger
      this.route.queryParams.subscribe(params => { this.reason = params['reason']; this.folioNo = params['folioNo'] }); // Print the parameter to the console.
      if (this.reason != '' && this.reason != null && this.reason!= undefined) {
        this.tree = this._router.createUrlTree([], { queryParams: { startedDate: this.reqModel.startedDate, endDate: this.reqModel.endDate, branchCode: this.reqModel.branchCode, reason: this.reason } });
      } else if (this.folioNo != '' && this.folioNo != null && this.folioNo != undefined) {
        this.tree = this._router.createUrlTree([], { queryParams: { folioNo: this.folioNo, startedDate: this.reqModel.startedDate, endDate: this.reqModel.endDate, branchCode: this.reqModel.branchCode } });
      } else {
        this.tree = this._router.createUrlTree([], { queryParams: { startedDate: this.reqModel.startedDate, endDate: this.reqModel.endDate, branchCode: this.reqModel.branchCode } });
      }
      this.url = this.serializer.serialize(this.tree);
      console.log('treeee', this._router.url, this.url)

    })

  }
  getMenu(): Array<any> {


    const menu = [
      { name: 'Login', path: './Login', children: [] },

      {        name: 'Ana Sayfa', path: './Layout', children: [
          {
            name: 'Günlük Operasyon Raporu',
            path: '.' + this.url.replace('/Layout', ""), startedDate: this.reqModel.startedDate, endDate: this.reqModel.endDate, branchCode: this.reqModel.branchCode,
          }
          ,
          {
            name: 'Günlük Operasyon Raporu',
            path: './DailyReportSummary', startedDate: this.reqModel.startedDate, endDate: this.reqModel.endDate, branchCode: this.reqModel.branchCode,
            children: [
              {
                name: 'Detay Raporu',
                path: '.' + this.url.replace('/Layout/DailyReportSummary', "")

              }
            ]
          }
   


        ]
      }




      // ,

      // { 
      //   name: 'home', 
      //   path: './Layout', 
      //   children: [
      //     {
      //       name: 'DailyReportSummaryParam1',
      //       path: './DailyReportSummary?startedDate=Tue%20Nov%2026%202019%2000:00:00%20GMT%2B0300%20(GMT%2B03:00)&endDate=Tue%20Nov%2026%202019%2000:00:00%20GMT%2B0300%20(GMT%2B03:00)&branchCode=101',
      //       children: [
      //         { 
      //           name: 'DiscountSummary',
      //           path: './DiscountSummaryReport?startedDate=Tue%20Nov%2026%202019%2000:00:00%20GMT%2B0300%20(GMT%2B03:00)&endDate=Tue%20Nov%2026%202019%2000:00:00%20GMT%2B0300%20(GMT%2B03:00)&branchCode=101'
      //         },
      //         { 
      //           name: 'THE RETURN OF THE KING',
      //           path: './book2'
      //         },
      //         { 
      //           name: 'Harry Potter and the Philosopher\'s Stone',
      //           path: './book3'
      //         },
      //         { 
      //           name: 'Harry Potter and the Chamber of Secrets',
      //           path: './book4'
      //         }              
      //       ]
      //     }
      //   ] 
      // },




    ];
    return menu;
  }
}
