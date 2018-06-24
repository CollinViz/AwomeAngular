import { Directive } from '@angular/core';
import { FormsModule, NgForm, ControlContainer } from '@angular/forms';

@Directive({
  selector: '[appProvideParentForm]',
  providers: [
    {
        provide: ControlContainer,
        useFactory: function (form: NgForm) {
            return form;
        },
        deps: [NgForm]
    }
]
})
export class ProvideParentFormDirective {

  constructor() { }

}
