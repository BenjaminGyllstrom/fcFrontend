import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AuthGuardService } from '../AuthGuard.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private auth: AuthGuardService) { }

  private baseUrl: string = "http://localhost:3000";

  options = {
    params: new HttpParams(),
    headers: new HttpHeaders()
  }

  idToken:string;
  idTokenChanged = new Subject<void>();

  get(uri: string, params?: any) {
    this.options.params = new HttpParams();

    if(params){
      this.options.params = new HttpParams({fromObject: params});
    }

    if(this.idToken)this.setIdToken();

    return this.httpClient.get(`${this.baseUrl}/${uri}`, this.options);
  }

  post(uri: string, payload: any, params?: any){
    this.options.params = new HttpParams();
    if(params){
      this.options.params = new HttpParams({fromObject: params});
    }
    this.setIdToken();

    return this.httpClient.post(`${this.baseUrl}/${uri}`, payload, this.options);
  }

  patch(uri: string, payload: any){
    this.options.params = new HttpParams();
    this.setIdToken();
    return this.httpClient.patch(`${this.baseUrl}/${uri}`, payload, this.options);
  }

  delete(uri: string){
    this.options.params = new HttpParams();
    this.setIdToken();
    return this.httpClient.delete(`${this.baseUrl}/${uri}`, this.options);
  }

  setIdToken(){
    if(this.idToken && !this.options.headers.has("idToken")){
      this.options.headers = this.options.headers.append("idToken", this.idToken);
    }else{
      this.options.headers = this.options.headers.set("idToken", this.idToken);
    }
  }
}
