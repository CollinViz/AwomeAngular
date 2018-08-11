import { Directive,ElementRef,Input,OnInit,OnChanges,SimpleChanges ,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardHeaderCssFormGroup]'
})
export class CardHeaderCssFormGroupDirective implements  OnChanges,OnInit {
  @Input('appCardHeaderCssFormGroup') IsValid: boolean;
  private strClassList:any;
  private strClassParentList:any;
  ngOnChanges(changes: SimpleChanges) {
    const parent = this.renderer.parentNode(this.el.nativeElement);
    if(parent==null){
      return;
    }
    // changes.prop contains the old and the new value...
    if(changes.IsValid.currentValue){
      //this.renderer.addClass(this.el,"bg-success");
      //this.renderer.removeClass(this.el,"bg-danger");
      
      //this.renderer.addClass(parent,"border-success");
      //this.renderer.removeClass(parent,"border-danger");
      this.el.nativeElement.className =this.strClassList + " bg-success text-white ";
      parent.className =this.strClassParentList + " border-success ";
    }else{
      //this.renderer.addClass(this.el,"bg-danger"); 
      //this.renderer.removeClass(this.el,"bg-success");
      //this.renderer.addClass(parent,"border-danger");
      //this.renderer.removeClass(parent,"border-success");
      this.el.nativeElement.className =this.strClassList + " bg-danger text-white ";
      parent.className =this.strClassParentList + " border-danger ";
    }
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {
    //this.FormGroup.
    this.strClassList = this.el.nativeElement.className + " text-white ";
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.strClassParentList = parent.className;
   }
   ngOnInit(){
    
    
   }
}
