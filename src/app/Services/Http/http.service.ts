import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AuthGuardService } from '../../features/shared/utils/AuthGuard.service';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient) { }

  private baseUrl: string = environment.serverUrl;

  options = {
    params: new HttpParams(),
    headers: new HttpHeaders()
  }

  get(uri: string, params?: any, headers?: any) {
    this.options.params = new HttpParams();
    this.options.headers = new HttpHeaders();

    if(params){
      this.options.params = new HttpParams({fromObject: params});
    }
    if(headers){
      this.options.headers = headers.headers
    }

    return this.httpClient.get(`${this.baseUrl}/${uri}`, this.options);
  }

  post(uri: string, payload: any, params?: any, headers?: any){
    this.options.params = new HttpParams();
    this.options.headers = new HttpHeaders();
    if(params){
      this.options.params = new HttpParams({fromObject: params});
    }
    if(headers){
      this.options.headers = headers.headers
    }

    return this.httpClient.post(`${this.baseUrl}/${uri}`, payload, this.options);
  }

  patch(uri: string, payload: any){
    this.options.params = new HttpParams();
    this.options.headers = new HttpHeaders();

    return this.httpClient.patch(`${this.baseUrl}/${uri}`, payload, this.options);
  }

  delete(uri: string){
    this.options.params = new HttpParams();
    this.options.headers = new HttpHeaders();
    return this.httpClient.delete(`${this.baseUrl}/${uri}`, this.options);
  }
}
