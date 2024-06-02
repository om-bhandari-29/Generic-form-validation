import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormErrors } from '../constant/constants.constant';

@Directive({
  selector: '[appCrossFieldValidation]'
})
export class CrossFieldValidationDirective {

  @Input() controlName!: FormControl[];
  @Input() formGroup!: FormGroup;

  constructor(private el: ElementRef, private rederer: Renderer2) { }

  ngOnInit(): void {

    this.formGroup.statusChanges.subscribe((val) => {
      this.updateErrorMessages()
    })
  }

  private updateErrorMessages() {
    const element = this.el.nativeElement;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    if (this.controlName[1] && (this.controlName[1].touched || this.controlName[1].dirty)) {
      if (this.controlName[1].errors?.['required']) {
        this.addErrorMessage(FormErrors.required);
      }
      else if (this.formGroup && this.formGroup.errors) {
        if (this.formGroup.errors['passwordMismatchError']) {
          this.addErrorMessage(FormErrors.passwordMissMatchError);
        }
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
