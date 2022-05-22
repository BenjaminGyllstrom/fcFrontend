import { Router } from '@angular/router';
import { LogInComponent } from './../Profile/log-in/log-in.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from 'angularx-social-login';
import { HttpService } from 'src/app/Services/Http/http.service';
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth: any
  menuMode = false;
  showActions = false;

  constructor(
    public socialAuthService: SocialAuthService,
    private httpService: HttpService,
    public dialog: MatDialog,
    private router: Router,
    private observer: BreakpointObserver) { }

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

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((auth: any) => {
      this.auth = auth
      if(auth){
        console.log('setting token in header');

        this.auth = auth
        this.httpService.idToken = auth.idToken
        this.httpService.idTokenChanged.next();
      }
    })
  }

  onLogin(){
    const dialogRef = this.dialog.open(LogInComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then(() => {
      this.httpService.idToken = "";
      console.log('logged out');
      this.router.navigate(['/home'])
    }) ;
  }
}
