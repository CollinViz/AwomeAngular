import { Injectable } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import { QuestionBase } from './question-base'
import { Observable } from 'rxjs';
import { CheckBoxQuestion } from './question-checkBox'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteCheckComponent } from '../common/dialog/delete-check/delete-check.component'
@Injectable({
  providedIn: 'root'
})
export class CustomFromHelperControlService {

  constructor( public dialog: MatDialog) { }
  showConfirmDelete(Message:string):Observable<any>{
    const dialogRef = this.dialog.open(DeleteCheckComponent, {
      data: Message
    });

    return dialogRef.afterClosed();
  }
  getDateValue(DateInfo:any){
    const myvar = DateInfo;//this.Finance.get('When_Training').value;
    if(myvar===null){
      return null;
    }
    if((myvar instanceof Date)){
      return (myvar as Date).getFullYear()+"-" + ((myvar as Date).getMonth()+1) + "-" + (myvar as Date).getDate();
    }
    if((typeof myvar === "string")){
      if(myvar.trim()===''){
        return null;
      }else{
        return myvar;
      }
    }
    if((typeof myvar === "undefined")){
      return null;
    }
    console.log(typeof myvar);
    console.log(DateInfo);

    if(DateInfo.trim){
      if(DateInfo.trim()==='')
        return null;
    }
    return DateInfo;
  }
  flattenObject(ob:any){
    var toReturn = {};
    
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      
      if ((typeof ob[i]) == 'object') {
        var flatObject = this.flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          
          toReturn[ x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
  toFormGroup(...questions: QuestionBase<any>[][] ) {
    let group: any = {};

    questions.forEach(question => {
      question.forEach(q=>{

        if(q.controlType==='checkboxGroup'){
          (q as CheckBoxQuestion).options.forEach(check=>{
            //console.log("Check box group code ",check)
            group[check.Key] = check.required ? new FormControl(check.Value || '', Validators.required)
                                              : new FormControl(check.Value || '');
          });
        }else{
          group[q.key] = q.required ? new FormControl(q.value || '', Validators.required)
                                              : new FormControl(q.value || '');
        }
        
      })
      
    });
    return new FormGroup(group);
  }
}
