import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { RegisterModel } from '../../model/register.model';
import { FormErrors } from '../../shared/constant/constants.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild('eye') eye!: ElementRef<HTMLElement>;

  public formControl: FormControl[] = [];
  public FormError = FormErrors;

  public registerForm: FormGroup<RegisterModel> = new FormGroup<RegisterModel>({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9_\-\.]+@[a-z]+\.[c][o][m]/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).*/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, { validators: this.customPasswordMatching.bind(this) });


  public customPasswordMatching(control: AbstractControl): ValidationErrors | null {
    const password:string = control.get('password')?.value;
    const confirmPassword:string = control.get('confirmPassword')?.value;

    return password == confirmPassword ? null : { passwordMismatchError: true };
  }

  constructor() {
    this.formControl.push(this.registerForm.controls.password);
    this.formControl.push(this.registerForm.controls.confirmPassword);
  }

  public toggleEye(element: HTMLInputElement){
    const eyeElement: HTMLElement = this.eye.nativeElement;
    if(eyeElement.classList.contains('bi-eye-slash-fill')){
      eyeElement.classList.remove('bi-eye-slash-fill');
      eyeElement.classList.add('bi-eye-fill');
      element.type = "text"
    }
    else{
      eyeElement.classList.remove('bi-eye-fill');
      eyeElement.classList.add('bi-eye-slash-fill');
      element.type = "password"
    }
  }
}

