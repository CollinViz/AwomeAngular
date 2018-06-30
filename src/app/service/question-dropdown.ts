import { QuestionBase } from './question-base';
import { Options } from './question-helper';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: Options[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/