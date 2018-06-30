import { Injectable } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import { QuestionBase } from './question-base'

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
        group[q.key] = q.required ? new FormControl(q.value || '', Validators.required)
                                              : new FormControl(q.value || '');
      })
      
    });
    return new FormGroup(group);
  }
}
