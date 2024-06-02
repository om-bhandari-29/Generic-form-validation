import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel, LoginData } from '../../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(){
    // super();
  }

  public loginForm: FormGroup<LoginModel> = new FormGroup<LoginModel>({
    email: new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9_\-\.]+@[a-z]+\.[c][o][m]/)]),
    password: new FormControl(null, Validators.required)
  });


  // public login(){
  //   this.loginForm.markAllAsTouched();

  //   if(this.loginForm.valid){
  //     this.isShowBtnLoader = true;
  //     const loginUData: LoginData = this.loginForm.value as LoginData;
  
  //     this.headerOptions.isSilentCall = true;

  //     this.postMethodPromise<LoginData, ResponseGeneric<IUser>>(APIRoutes.login, loginUData, this.headerOptions).then(
  //       (res) =>{
  //         if(res.status){
  //           this._toastreService.success(res.message);
  //           this._utilService.loggedIdUserName = res.data.name;
  //           this._utilService.loggedInUser$.next(true);
  //           this._router.navigate(['/']);
  //           localStorage.setItem(environment.jwtTokenName, res.data.token);
  //         }
  //         else{
  //           this._toastreService.error(res.message);
  //         }
  //       }
  //     )
  //   }
  // }
}
