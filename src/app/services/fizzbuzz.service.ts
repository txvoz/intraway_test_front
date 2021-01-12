import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FizzBuzz } from '../interfaces/FizzBuzz';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { RequestServerResponse } from '../interfaces/RequestServerResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService extends ApiService<FizzBuzz,number>{

  URL_FIZZBUZZ:string = environment.API_FIZZBUZZ;
  FIZZBUZZ_REQUEST:string;

  protected getENDPOINT(): string {
    return this.URL_FIZZBUZZ;
  }

  protected isSECURE(): boolean {
    return false;
  }

  constructor(protected http:Http) {
    super(http);
    this.FIZZBUZZ_REQUEST = this.URL_FIZZBUZZ+"/{min}/{max}";
  }

  public requestFizzBuzz(min:number, max: number):Observable<RequestServerResponse<Object>>{
    let ENDPOINT = this.FIZZBUZZ_REQUEST.replace("{min}",min+"");
    ENDPOINT = ENDPOINT.replace("{max}",max+"");
    return super.get(ENDPOINT,this.isSECURE());
  }
}
