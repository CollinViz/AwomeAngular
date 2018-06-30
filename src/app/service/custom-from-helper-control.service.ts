import { Injectable } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import { QuestionBase } from './question-base'
import { CheckBoxQuestion } from './question-checkBox';
import { CheckBoxOptions } from './question-helper';

@Injectable({
  providedIn: 'root'
})
export class CustomFromHelperControlService {

  constructor() { }
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
