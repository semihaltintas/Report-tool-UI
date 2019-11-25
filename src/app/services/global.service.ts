import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {requestModel, branchModel} from '../models/globalModel';
import {apiUrls} from '../enums/serviceUrls';


let reqModel : requestModel = {
  branchCode :0,
  startedDate : new Date,
  endDate : new Date
}


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
url = "";
reason= "";
constructor(public http : HttpClient) { }

getReportData(model : requestModel,url : apiUrls,licanceNo : string) {
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  let options = { headers: httpHeaders };   
  let parameters = JSON.stringify({
    requestModel : model,
    licanceNo : licanceNo 
  });
  let params = new HttpParams();        
  return this.http.post(url,parameters,options)       
}

getBranchList(licanceNo) : Observable<branchModel[]>
{
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  let options = { headers: httpHeaders };   
  let parameters = JSON.stringify({   
    licanceNo : licanceNo 
  });
  let params = new HttpParams();        
  return this.http.post<branchModel[]>(apiUrls.getAllBranchs,parameters,options)       
}

getNewRequstModel() 
{
  return reqModel;
}

getCurrentUrl() {
  return this.url;
}

setCurrentUrl(currentUrl){
  this.url = currentUrl
}

setSelectedReason(reason){
  this.reason = reason;
}


}
