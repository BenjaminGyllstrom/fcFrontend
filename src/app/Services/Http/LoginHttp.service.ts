import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { HttpService } from "../Http/http.service";

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {


  constructor(private httpService: HttpService) {}

  login(token: any) : Observable<any> {
    return this.httpService.post(`users/login`, token);
  }
  register(token: any) : Observable<any> {
    return this.httpService.post(`users/register`, token);
  }
}
