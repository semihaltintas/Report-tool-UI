import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { requestModel, branchModel } from '../models/globalModel';
import { apiUrls } from '../enums/serviceUrls';
import { UserService } from '../shared/userServices/user.service';

let reqModel: requestModel = {
  branchCode: 0,
  startedDate: new Date,
  endDate: new Date,
  groupType: ''
}


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  url = "";
  reason = "";

  constructor(public _userService: UserService, public http: HttpClient) { }

  getReportData(model: requestModel, url: apiUrls, licanceNo: string, parameter: string, parameter1: string) {
    debugger
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    let options = { headers: httpHeaders };
    let parameters = JSON.stringify({
      requestModel: model,
      licanceNo: licanceNo,
      parameter: parameter,
      parameter1: parameter1
    });
    let params = new HttpParams();
    return this.http.post(url, parameters, options)
  }

  getBranchList(licanceNo): Observable<branchModel[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    let options = { headers: httpHeaders };
    let parameters = JSON.stringify({
      // companyCode : '100,101',
      companyCode: this._userService.userLicances[0].companyCode,
      licanceNo: licanceNo
    });
    let params = new HttpParams();
    console.log("parameters : " + parameters)
    return this.http.post<branchModel[]>(apiUrls.getAllBranchs, parameters, options)
  }

  getNewRequstModel() {
    return reqModel;
  }

  getCurrentUrl() {
    return this.url;
  }

  setCurrentUrl(currentUrl) {
    this.url = currentUrl
  }

  setSelectedReason(reason) {
    this.reason = reason;
  }

  getExcelFileName(description: string, date1: any, date2: any) {
    var excelFileName;
    var dateObject1 = new Date(date1);
    var dateObject2 = new Date(date2);
    excelFileName = description + " " + dateObject1.toLocaleString().split(' ')[0] + " - " + dateObject2.toLocaleString().split(' ')[0]
    return excelFileName
  }

}
