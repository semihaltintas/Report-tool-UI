import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient} from '@angular/common/http';
import {apiUrls} from '../../../enums/serviceUrls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountSummaryReportService {

constructor(public http : HttpClient) { }

getDiscountSummaryReport(model,licanceNo) : Observable<any[]> {
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  let options = { headers: httpHeaders };   
  let parameters = JSON.stringify({   
    requestModel: model,
    licanceNo : licanceNo,    
  });
  let params = new HttpParams();        
  return this.http.post<any[]>(apiUrls.getDiscountReport,parameters,options)       
}

getDiscountDetailReport(model,reason,licanceNo) : Observable<any[]> {
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  let options = { headers: httpHeaders };   
  let parameters = JSON.stringify({   
    requestModel: model,
    reason :reason,
    licanceNo : licanceNo,    
  });
  let params = new HttpParams();        
  return this.http.post<any[]>(apiUrls.getDiscountDetailByReason,parameters,options)       
}

}
