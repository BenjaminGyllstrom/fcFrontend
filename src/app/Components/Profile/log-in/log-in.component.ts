import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HttpService } from 'src/app/Services/Http/http.service';
import { LoginHttpService } from 'src/app/Services/Http/LoginHttp.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private loginHttpService: LoginHttpService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((res: any) => {
      console.log(res);
      this.httpService.idToken = res.idToken;
    })
  }

  loginWithGoogle(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then( (user) => {
      console.log('logged in')
      this.loginHttpService.post({token: user.idToken}).subscribe((token)=>
      {
        console.log(token);
      });
    })
  }
}
