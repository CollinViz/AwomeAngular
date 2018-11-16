import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';
import { CheckBoxQuestion } from './question-checkBox';
import { TextboxQuestion, NumbersQuestion } from './question-textbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteCheckComponent } from '../common/dialog/delete-check/delete-check.component';
@Injectable({
  providedIn: 'root'
})
export class CustomFromHelperControlService {

  constructor(public dialog: MatDialog) { }
  showConfirmDelete(Message: string): Observable<showConfirmDeleteResult> {
    const dialogRef = this.dialog.open(DeleteCheckComponent, {
      data: Message
    });

    return dialogRef.afterClosed();
  }
  getDateValue(DateInfo: any): string | null {
    const myvar = DateInfo; //this.Finance.get('When_Training').value;
    if (myvar === null) {
      return null;
    }
    if ((myvar instanceof Date)) {
      return (myvar as Date).getFullYear() + "-" + ('0' + ((myvar as Date).getMonth() + 1)).slice(-2) + "-" + ('0' + (myvar as Date).getDate()).slice(-2);
    }
    if ((typeof myvar == "string")) {
      if (myvar.trim() === '') {
        return null;
      } else {
        return myvar;
      }
    }
    if ((typeof myvar == "undefined")) {
      return null;
    }

    if (DateInfo.trim) {
      if (DateInfo.trim() == '') {
        return null;
      }
    }
    return DateInfo;
  }
  flattenObject(ob: any): any {
    var toReturn = {};

    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) { continue; }

      if ((typeof ob[i]) == 'object') {
        if (ob[i] instanceof Date) {
          toReturn[i] = this.getDateValue(ob[i]);
        } else {
          let flatObject = this.flattenObject(ob[i]);
          for (let x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) { continue; }

            toReturn[x] = flatObject[x];
          }
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
  toFormGroup(...questions: QuestionBase<any>[][]) {
    let group: any = {};

    questions.forEach(question => {
      question.forEach(q => {

        if (q.controlType === 'checkboxGroup') {
          (q as CheckBoxQuestion).options.forEach(check => {
            //console.log("Check box group code ",check)
            group[check.Key] = check.required ? new FormControl(check.Value || '', Validators.required)
              : new FormControl(check.Value || '');
          });
        } else {
          let aValidation = [];
          if (q.required) {
            aValidation.push(Validators.required);
          }
          if (q.controlType === "textbox") {
            if (q.min > 0) {
              aValidation.push(Validators.maxLength(q.max));
              aValidation.push(Validators.minLength(q.min));
            }
          } else if (q.controlType === "numbers") {
            if (q.min > 0) {
              aValidation.push(Validators.max(q.max));
              aValidation.push(Validators.min(q.min));
            }
          }
          //group[q.key] = q.required ? new FormControl(q.value || '', aValidation)
          group[q.key] = new FormControl(q.value || q.defaultValue, aValidation)
          //  : new FormControl(q.value || '',aValidation);

        }

      })

    });
    return new FormGroup(group);
  }
}
export function forceValidate(ControlName: string, RequirerControls: {
  name: string,
  min?: number, max?: number,
  UseLengthValidation?: boolean
}[],
  ValidateCheckValue: string = ""): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    let fixControl = ControlName;
    let BoolCheckInverted = false;
    if (!control.dirty) {
      return null;
    }
    if (fixControl.substr(0, 1) === "!") {
      BoolCheckInverted = true;
      fixControl = ControlName.substr(1);
    }
    const toTestControl = control.get(fixControl);
    if (toTestControl) {
      //Only support Toggles for now
      let canChange: boolean = false;
      if (ValidateCheckValue !== "") {
        canChange = BoolCheckInverted ? toTestControl.value !== ValidateCheckValue : toTestControl.value === ValidateCheckValue;
      } else {
        canChange = BoolCheckInverted ? toTestControl.value === false : toTestControl.value === true;
        if (toTestControl.value === "1") {
          canChange = BoolCheckInverted ? false : true;
        }
        if (toTestControl.value === "0") {
          canChange = BoolCheckInverted ? true : false;
        }
        if (toTestControl.value === "Y") {
          canChange = BoolCheckInverted ? false : true;
        }
        if (toTestControl.value === "N") {
          canChange = BoolCheckInverted ? true : false;
        }
      }
      RequirerControls.forEach((changeControl) => {
        const alterEgo = control.get(changeControl.name);
        if (alterEgo) {
          if (canChange) {
            var addValidation: ValidatorFn[] = [];
            let useLengthValidation: boolean = changeControl.UseLengthValidation || true;
            addValidation.push(Validators.required);
            //alterEgo.setValidators([Validators.required]);
            if (changeControl.max || 0 > 0) {
              if (useLengthValidation) {
                addValidation.push(Validators.maxLength(changeControl.max));
              } else {
                addValidation.push(Validators.max(changeControl.max));
              }
            }
            if (changeControl.min || 0 > 0) {
              if (useLengthValidation) {
                addValidation.push(Validators.minLength(changeControl.min));
              } else {
                addValidation.push(Validators.min(changeControl.min));
              }
            }
            alterEgo.setValidators(addValidation);
            alterEgo.enable({ onlySelf: true, emitEvent: true });
            //alterEgo.markAsDirty();
          } else {
            alterEgo.clearValidators();
            //alterEgo.setValue("",{emitEvent:false});
            alterEgo.disable({ onlySelf: true, emitEvent: true });
          }
          alterEgo.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        } else {
          console.log("Cannot find control " + changeControl.name);
        }
      });
    } else {
      console.log("Cannot find control " + fixControl);
    }
    return null;
  };
}

export interface showConfirmDeleteResult {
  Result: string;
  data: any;
}
