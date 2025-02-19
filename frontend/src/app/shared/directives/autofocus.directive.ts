import { contentChildren, Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective {
  formControls = contentChildren(NgControl, {descendants:true});

  @HostListener('submit')
  public onSubmit(): void{
    for(const control of this.formControls()){
      if(control.invalid){
        (control.valueAccessor as any).el?.nativeInput?.focus();
        break;
      }
    }
  }
}
