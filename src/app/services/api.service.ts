import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiGeneral } from '../services/api.utils';
import { RequestServerResponse } from '../interfaces/RequestServerResponse';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<I,ID> extends ApiGeneral{

  protected abstract getENDPOINT():string;
  protected abstract isSECURE():boolean;

  constructor(protected http: Http) {
    super(http);
  }

  public findAll(): Observable<RequestServerResponse<I[]>>{
    return super.get(this.getENDPOINT(),this.isSECURE());
  }

  public findOne(id:ID):Observable<RequestServerResponse<I>>{
    return super.get(this.getENDPOINT()+"/"+id,this.isSECURE());
  }

  public create(data:I): Observable<RequestServerResponse<any>>{
    return super.post(this.getENDPOINT(),data,this.isSECURE());
  }

  public edit(data:I,id:ID): Observable<RequestServerResponse<I>>{
    return super.put(this.getENDPOINT()+"/"+id,data,this.isSECURE());
  }

  public destroy(id:ID):Observable<RequestServerResponse<any>>{
    return super.delete(this.getENDPOINT()+"/"+id,this.isSECURE());
  }
}
