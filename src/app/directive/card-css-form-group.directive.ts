import { Directive,ElementRef,Input,OnChanges,SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCardCssFormGroup]'
})
export class CardCssFormGroupDirective implements  OnChanges {
  @Input('appCardCssFormGroup') IsValid: boolean;
  private strClassList:any;
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if(changes.IsValid.currentValue){
      this.el.nativeElement.className =this.strClassList + " border-success "
    }else{
      this.el.nativeElement.className =this.strClassList + " border-danger "
    }
  }
  constructor(private el: ElementRef) {
    //this.FormGroup.
    this.strClassList = el.nativeElement.className;
   }

}
