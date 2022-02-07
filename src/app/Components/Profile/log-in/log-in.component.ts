import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((res: any) => {
      console.log(res);
      if(res?.idToken){       
        //todo: collect token from cookie instead. This code might set idToken to something even if auth fails 
        this.httpService.idToken = res.idToken;
      }
    })
  }

  loginWithGoogle(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then( (user) => {
      this.loginHttpService.login({token: user.idToken}).subscribe((response)=>
      {  
        if(response.success){
          console.log('logged in')
          this.httpService.idToken = response.token
          this.router.navigate(['/home']);
        }else{
          console.log('auth failed');
          
          this.socialAuthService.signOut().then(()=>
          {
            console.log('logging out');
            this.httpService.idToken = ""
          });
        }
      });
    })
  }
}
