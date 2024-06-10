import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormErrors } from '../constant/constants.constant';

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective implements OnInit {

  @Input() controlName!: FormControl; 
  @Input() formGroup!: FormGroup;
  @Input() patternError: string = "";

  constructor(private el: ElementRef, private rederer: Renderer2) {}

  ngOnInit(): void {

    this.controlName.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })

    this.controlName.valueChanges.subscribe(() => {
      console.log(this.controlName.errors);
      
      this.updateErrorMessages();
    })
  }


  private updateErrorMessages() {
    const element = this.el.nativeElement;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    if (this.controlName && (this.controlName.touched || this.controlName.dirty) && this.controlName.errors) {

      if (this.controlName.errors['required']) {
        this.addErrorMessage(FormErrors.required);
      }
      else
      if (this.controlName.errors['pattern']) {
        this.addErrorMessage(this.patternError);
      }
      else
      if (this.controlName.errors['minlength']) {
        this.addErrorMessage(FormErrors.minLength(this.controlName.errors['minlength'].requiredLength));
      }
    }
  }

  private addErrorMessage(message: string) {
    const errorElement = this.rederer.createElement('small');
    const text = this.rederer.createText(message);
    this.rederer.appendChild(errorElement, text);
    this.rederer.appendChild(this.el.nativeElement, errorElement);
    this.rederer.setStyle(errorElement, 'color', 'red');
  }

}
