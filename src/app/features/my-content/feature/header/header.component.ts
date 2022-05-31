import { LoginPopupComponent } from 'src/app/features/Profile/login-popup/login-popup.component';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../../../shared/utils/AuthGuard.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from 'angularx-social-login';
import { HttpService } from 'src/app/Services/Http/http.service';
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  auth: any
  menuMode = false;
  showActions = false;

  constructor(
    public socialAuthService: SocialAuthService,
    private httpService: HttpService,
    public dialog: MatDialog,
    private router: Router,
    private observer: BreakpointObserver,
    private authService: AuthGuardService) { }

    subs:Subscription[] = [];
    ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
    }

    ngAfterViewInit(){
      this.observer.observe(['(min-width:750px)']).subscribe(res=>{
        setTimeout(()=>{
          if(res.matches){
            this.menuMode = false
            this.showActions = false;
          }else{
            this.menuMode = true;
          }
        },10)
      })
    }

  isLoggedIn = false;
  ngOnInit(): void {
    this.subs.push(this.authService.tokenChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    }))
  }

  onLogin(){
    const dialogRef = this.dialog.open(LoginPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logout(): void {
    this.authService.deleteToken();
    this.router.navigate(['home'])
  }
}
