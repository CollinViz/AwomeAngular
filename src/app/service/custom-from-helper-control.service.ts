import { Injectable } from '@angular/core';
import { FormControl, FormGroup ,Validators,ValidatorFn,ValidationErrors} from '@angular/forms'; 
import { QuestionBase } from './question-base'
import { Observable } from 'rxjs';
import { CheckBoxQuestion } from './question-checkBox'; 
import {TextboxQuestion,NumbersQuestion} from './question-textbox'
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
      return (myvar as Date).getFullYear()+"-" + ('0'+((myvar as Date).getMonth()+1)).slice(-2) + "-" + ('0'+(myvar as Date).getDate()).slice(-2);
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
          let aValidation = [];
          if(q.required){
            aValidation.push(Validators.required);
          }
          if(q.controlType==="textbox"){
            if(q.min>0){
              aValidation.push(Validators.maxLength(q.max));
              aValidation.push(Validators.minLength(q.min));
            }
          }else if(q.controlType==="numbers"){
            if(q.min>0){
              aValidation.push(Validators.max(q.max));
              aValidation.push(Validators.min(q.min));
            }
          } 
          //group[q.key] = q.required ? new FormControl(q.value || '', aValidation)
          group[q.key] =  new FormControl(q.value || '', aValidation)
                                        //  : new FormControl(q.value || '',aValidation);
          
        }
        
      })
      
    });
    return new FormGroup(group);
  }
}
export function forceValidate(ControlName:string,RequirerControls:{name:string,
                                                                  min?:number,max?:number,
                                                                  UseLengthValidation?:boolean}[]): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    let fixControl  = ControlName;
    let BoolCheckInverted = false;
    if(fixControl.substr(0,1)==="!"){
      BoolCheckInverted = true;
      fixControl  = ControlName.substr(1);
    }
    const toTestControl = control.get(fixControl);
    if(toTestControl){
      //Only support Toggles for now
      
      RequirerControls.forEach((changeControl)=>{
        const alterEgo = control.get(changeControl.name);          
        if(alterEgo ){  
          let canChange = BoolCheckInverted? toTestControl.value === false:toTestControl.value === true                 
          if(canChange){
            var addValidation:ValidatorFn[] = [];
            let useLengthValidation:boolean = changeControl.UseLengthValidation||true;
            addValidation.push(Validators.required);
            //alterEgo.setValidators([Validators.required]);
            if(changeControl.max||0>0){    
              if(useLengthValidation){
                addValidation.push(Validators.maxLength(changeControl.max));
              }else{
                addValidation.push(Validators.max(changeControl.max));
              }          
              
            }
            if(changeControl.min||0>0){
              if(useLengthValidation){
                addValidation.push(Validators.minLength(changeControl.min));
              }else{
                addValidation.push(Validators.min(changeControl.min));
              }              
            }
            alterEgo.setValidators(addValidation);
            //alterEgo.markAsDirty();
          }else{      
            alterEgo.clearValidators();            
          }
          alterEgo.updateValueAndValidity({onlySelf:true,emitEvent:false});           
        }
      });
       
    }
    
    return null;
  };
}

