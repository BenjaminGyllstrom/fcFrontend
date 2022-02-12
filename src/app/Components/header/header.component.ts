import { LogInComponent } from './../Profile/log-in/log-in.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from 'angularx-social-login';
import { HttpService } from 'src/app/Services/Http/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth: any

  constructor(
    public socialAuthService: SocialAuthService,
    private httpService: HttpService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((auth: any) => {
      this.auth = auth
      if(auth){
        console.log('setting token in header');

        this.auth = auth
        this.httpService.idToken = auth.idToken
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
    }) ;
  }
}
