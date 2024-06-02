import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { RegisterModel } from '../../model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public formControl: FormControl[] = [];

  public registerForm: FormGroup<RegisterModel> = new FormGroup<RegisterModel>({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9_\-\.]+@[a-z]+\.[c][o][m]/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
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
}

