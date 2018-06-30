import { QuestionBase } from './question-base';
import { CheckBoxOptions } from './question-helper'
export class CheckBoxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  type: string;
  options: CheckBoxOptions[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    //checkboxGroup
    this.options = options['options'] || [];
    if(this.options.length>0){
      this.controlType = "checkboxGroup";
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/