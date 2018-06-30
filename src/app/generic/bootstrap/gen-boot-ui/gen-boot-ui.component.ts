import { OnInit,Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase } from '../../../service/question-base'; 

@Component({
  selector: 'app-gen-boot-ui',
  templateUrl: './gen-boot-ui.component.html',
  styleUrls: ['./gen-boot-ui.component.css']
})

export class GenBootUiComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() {
      if(!this.form.controls[this.question.key]) {
        console.log("Question",this.question.key);
        console.log("What is the formGroup",this.form.controls[this.question.key]);
        console.log("What is the formGroup",this.form);
      }
      
    return this.form.controls[this.question.key].valid; }//this.form.controls[this.question.key].valid; }
  constructor() { }

  ngOnInit() {
  }

}
