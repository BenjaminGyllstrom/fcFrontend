import { MatDialog } from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  tokenChanged = new BehaviorSubject<boolean>(this.isLoggedIn())

  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              public dialog: MatDialog) {
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.socialAuthService.authState.pipe(
  //     map((socialUser: SocialUser) => !!socialUser),
  //     tap((isLoggedIn: boolean) => {
  //       if (!isLoggedIn) {
  //         const dialogRef = this.dialog.open(LogInComponent);

  //         dialogRef.afterClosed().subscribe(result => {
  //           console.log(`Dialog result: ${result}`);
  //         });
  //       }
  //     })
  //   );
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.isLoggedIn()){
      this.deleteToken();
      this.router.navigate(['login'])
    }
    return true;
  }

  private setLoginStatus(){
    this.tokenChanged.next(this.isLoggedIn());
  }

  setToken(token:string){
    localStorage.setItem('token', token)
    this.setLoginStatus();
  }
  deleteToken(){
    localStorage.removeItem('token');
    this.setLoginStatus();
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserPayload(){
    const token = this.getToken();;
    if(token){
      const userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload);
    }else{
      return null;
    }
  }
  isLoggedIn(){
    const userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000
    return false;
  }
}
