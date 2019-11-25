import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient} from '@angular/common/http';
import {apiUrls} from '../../../enums/serviceUrls';
import { folioDetailModel } from '../models/folioDetailModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FolioDetailService {
constructor(public http : HttpClient) { }
getFolioDetailByFolioNo(folioNo:String,licanceNo:number): Observable<folioDetailModel[]>
{
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  let options = { headers: httpHeaders };   
  let parameters = JSON.stringify({   
    licanceNo : licanceNo,
    folioNo : folioNo
  });
  let params = new HttpParams();        
  return this.http.post<folioDetailModel[]>(apiUrls.getFolioDetail,parameters,options)       
}


}
