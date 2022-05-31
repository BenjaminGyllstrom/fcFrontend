import { Router } from '@angular/router';
import { AuthGuardService } from '../features/shared/utils/AuthGuard.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private authService: AuthGuardService,
    private router: Router
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get('noauth')){
      return next.handle(req.clone());
    }else{
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.authService.getToken())
      });
      return next.handle(clonedReq).pipe(
        tap({
          next: (val) => {
          },
          error: (err) => {
            if(err.error.auth == false){
              this.router.navigate(['login'])
            }
          }
        })
      );
    }
  }
}
