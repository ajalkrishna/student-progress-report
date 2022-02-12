import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private hc:HttpClient) { }

  // get class data
  getClass():Observable<any>{
    return this.hc.get('https://jsonblob.com/api/jsonBolb/922837073522868224')
  }
  // get student Data
  getStudent():Observable<any>{
    return this.hc.get('https://jsonblob.com/api/jsonBolb/941215539137888256')
  }
}
