import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {requestModel} from '../../../models/globalModel';
import {apiUrls} from '../../../enums/serviceUrls';

@Injectable({
  providedIn: 'root'
})
export class DeletedItemService {

constructor(public http : HttpClient) { }


getDeletedItemsByReason(model: requestModel,reason,licanceNo) {
  debugger
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  let options = { headers: httpHeaders };   
  let parameters = JSON.stringify({
    requestModel : model,
    reason:reason,
    licanceNo : licanceNo 
  });
  let params = new HttpParams();        
  return this.http.post(apiUrls.getDetetedItemDataByReason,parameters,options)       
}


}
