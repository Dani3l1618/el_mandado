import { afterNextRender, Directive, ElementRef, HostListener, inject, input, Renderer2, signal } from '@angular/core';
import { APP_COLORS, ColorType } from '../constants/color.model';

@Directive({
  selector: '[appActiveBorder]',
  standalone: true
})
export class ActiveBorderDirective {

  private elementRef = inject(ElementRef);
  private render = inject(Renderer2);
  private currentBorder:string = '';
  private isActive = signal<boolean>(false);

  newBorder = input<ColorType>('secondary');
  borderDisable = input(false);


  @HostListener('click') onToggle(){
    if(!this.borderDisable()) this.toggleBorder();
  }

  constructor() {
    afterNextRender(()=>{
      this.currentBorder = getComputedStyle(this.elementRef.nativeElement).getPropertyValue("--border-color"); 
    },)   
  }

  private toggleBorder() {

    if(this.isActive()){
      this.render.setProperty(this.elementRef.nativeElement, 'style', `--border-color: ${this.currentBorder}`);
    }else{
      const color = APP_COLORS[this.newBorder()];
      this.render.setProperty(this.elementRef.nativeElement, 'style', `--border-color: ${color}`);
    }
    
    this.isActive.update(c=>!c);
  }

}
