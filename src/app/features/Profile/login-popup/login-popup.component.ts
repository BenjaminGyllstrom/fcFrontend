import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../shared/utils/AuthGuard.service';
import { Subscription } from 'rxjs';
import { LoginHttpService } from 'src/app/features/shared/data-access/Http/LoginHttp.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  isLoginMode = true;
  serverErrorMessages:string;
  constructor(
    private loginService:LoginHttpService,
    private authService: AuthGuardService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  subs:Subscription[] = []
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    const user = {
      username:form.value.username,
      email:form.value.email,
      password:form.value.password
    }

    if(this.isLoginMode){
      this.subs.push(this.loginService.loginUser({email:form.value.email, password: form.value.password}).subscribe({
        next: (res) =>{
          this.serverErrorMessages = ''
          this.authService.setToken(res['token'])
          this.dialogRef.close();
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.serverErrorMessages = err.error.message
        }
      }
      ));
    }else{



      this.subs.push(this.loginService.registerUser(user).subscribe({
        next: (res) =>{
          this.serverErrorMessages = ''
          this.dialogRef.close();
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.serverErrorMessages = err.error.message
        }
      }));
    }
  }

}
