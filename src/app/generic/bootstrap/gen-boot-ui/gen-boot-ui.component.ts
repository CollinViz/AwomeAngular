import { OnInit,Component, Input,Output ,EventEmitter} from '@angular/core';
import { FormGroup,ValidationErrors }        from '@angular/forms';
import { QuestionBase } from '../../../service/question-base'; 
import { isNumber } from 'util';

@Component({
  selector: 'app-gen-boot-ui',
  templateUrl: './gen-boot-ui.component.html',
  styleUrls: ['./gen-boot-ui.component.css']
})

export class GenBootUiComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Output() selectionChange:EventEmitter<any> = new EventEmitter<any>();
  get listOfErrors()  : ValidationErrors | null{
    if(this.question.controlType=='checkboxGroup'){
      return null;
    }
    if(!this.form.controls[this.question.key]) {
      return null
    }
    return this.form.controls[this.question.key].errors;
  }
  get isValid() {
      if(this.question.controlType=='checkboxGroup'){
        return true;
      }
      if(!this.form.controls[this.question.key]) {
        console.log("Question",this.question.key);
        console.log("What is the formGroup",this.form.controls[this.question.key]);
        console.log("What is the formGroup",this.form);
        return false;
      }
      
    return this.form.controls[this.question.key].valid; }//this.form.controls[this.question.key].valid; }
  constructor() { }

  ngOnInit() {
    
  }

  changeSelection(event){
    this.selectionChange.emit(event);
  }
  numberchange(event){
    //console.log(event);
    //console.log(this.form.controls[this.question.key].value);
    //if(this.form.controls[this.question.key].value==''){
    //  this.form.controls[this.question.key].setValue(this.question.defaultValue);
    //}
  }
}
