import { HttpHeaders } from '@angular/common/http';
import { ifStmt } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })}

  constructor(private httpService: HttpService) {}

  login(token: any) : Observable<any> {
    return this.httpService.post(`users/login`, token);
  }
  register(token: any) : Observable<any> {
    return this.httpService.post(`users/register`, token);
  }

  loginUser(authCredentials:any) : Observable<any> {
    return this.httpService.post(`users/authenticate`, authCredentials, null, this.noAuthHeader);
  }
  registerUser(user:any) : Observable<any> {
    return this.httpService.post(`users/register`, user, null, this.noAuthHeader);
  }
}
