import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = "http://localhost:3000";

  options = {
    params: new HttpParams(),
    headers: new HttpHeaders()
  }

  get(uri: string, params?: any) {
    this.options.params = new HttpParams();
    if(params){
      this.options.params = new HttpParams({fromObject: params});
    }
    return this.httpClient.get(`${this.baseUrl}/${uri}`, this.options);
  }

  post(uri: string, payload: any, params?: any){
    this.options.params = new HttpParams();
    if(params){
      this.options.params = new HttpParams({fromObject: params});
    }
    return this.httpClient.post(`${this.baseUrl}/${uri}`, payload, this.options);
  }

  patch(uri: string, payload: any){
    this.options.params = new HttpParams();
    return this.httpClient.patch(`${this.baseUrl}/${uri}`, payload, this.options);
  }

  delete(uri: string){
    this.options.params = new HttpParams();
    return this.httpClient.delete(`${this.baseUrl}/${uri}`);
  }
}
