import { OnInit,Component, Input,Output ,EventEmitter} from '@angular/core';
import { FormGroup,ValidationErrors }        from '@angular/forms';
import { QuestionBase } from '../../../service/question-base'; 
 
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-gen-boot-ui',
  templateUrl: './gen-boot-ui.component.html',
  styleUrls: ['./gen-boot-ui.component.css']
})

export class GenBootUiComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Output() selectionChange:EventEmitter<any> = new EventEmitter<any>();
  //@Output() NumberChange:EventEmitter<any> = new EventEmitter<any>();
  CurrencyValue:string = "R";

  get listOfErrors()  : ValidationErrors | null{
    if(this.question.controlType=='checkboxGroup'){
      return null;
    }
    if(!this.form.controls[this.question.key]) {
      return null
    }
    //ng-untouched
    if(this.form.controls[this.question.key].touched){
      return this.form.controls[this.question.key].errors;
    }else{
      return null;
    }
    
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
  constructor(public EwepserverService:EwepserverService) { }

  ngOnInit() {
    this.CurrencyValue = this.EwepserverService.SelectedCurrency;
     
  }

  changeSelection(event){
    this.selectionChange.emit(event);
  }
  selectAllContent($event) {
    $event.target.select();
  }
  changenumber(event){
    //this.NumberChange.emit(event);
    //console.log(event);
    //console.log(this.form.controls[this.question.key].value);
    //if(this.form.controls[this.question.key].value==''){
    //  this.form.controls[this.question.key].setValue(this.question.defaultValue);
    //}
  }
}
