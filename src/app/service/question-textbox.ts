import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;
  maxLength:number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxLength = options['maxLength'] || 50;
  }
}


export class NumbersQuestion extends QuestionBase<string> {
  controlType = 'numbers';
  type: string;
  maxLength:number;
  currency:boolean=false;
  currencySymbol:string='R';


  constructor(options: {} = {}) { 
    super(options);
    if(options['required']|| false){
      this.value = options['value']|| '0';
      if(this.value===''){
        this.value='0';
      } 
    }
    
    this.type = options['type'] || '';
    this.maxLength = options['maxLength'] || 50;
    this.currency = options['currency'] || false;
    this.currencySymbol = options['symbol'] || 'R';
    if(this.currency===true){
      this.controlType = "currency";
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/