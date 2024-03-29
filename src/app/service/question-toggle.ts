import { QuestionBase } from './question-base';

export class ToggleQuestion extends QuestionBase<string> {
  controlType = 'toggle';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.defaultValue = false;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/