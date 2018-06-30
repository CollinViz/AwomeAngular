import { QuestionBase } from './question-base';

export class MemoQuestion extends QuestionBase<string> {
  controlType = 'memo';
  type: string;
  maxLength:number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxLength = options['maxLength'] || 500;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/