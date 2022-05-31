import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HttpService } from 'src/app/features/shared/data-access/Http/http.service';
import { LoginHttpService } from 'src/app/features/shared/data-access/Http/LoginHttp.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private loginHttpService: LoginHttpService,
    private httpService: HttpService,
    private router: Router,
    private dialogRef: MatDialogRef<LogInComponent>
  ) {}

  ngOnInit(): void {
  }

  // loginWithGoogle(){
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //   .then( (user) => {
  //     this.loginHttpService.login({token: user.idToken}).subscribe((response)=>
  //     {
  //       if(response.success){
  //         console.log('logged in')
  //         this.httpService.idToken = response.token
  //         this.dialogRef.close();
  //       }else{
  //         console.log('auth failed');

  //         this.loginHttpService.register({token: user.idToken}).subscribe((response)=>{
  //           console.log("Register: "+response);

  //           this.socialAuthService.signOut().then(()=>
  //           {
  //             console.log('logging out');
  //             this.httpService.idToken = ""
  //           });

  //           if(response.success){
  //             console.log('You are now Registered');
  //           }else{
  //             console.log('Register failed');
  //           }
  //         })
  //       }
  //     });
  //   })
  // }
}
