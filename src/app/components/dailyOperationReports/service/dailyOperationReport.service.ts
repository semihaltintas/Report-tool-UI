import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {requestModel} from '../../../models/globalModel';
import {dailySummaryRequestModel,dailySummaryResponseModel} from './../models/dailySummaryReportModel';



@Injectable({
  providedIn: 'root'
})
export class DailyOperationReportService {

constructor(public http : HttpClient) { }





}
