import { QuestionBase } from './question-base';
import { Inject,Injectable, Injector, ElementRef } from '@angular/core';
import { GlobalService } from './Global'
//@Injectable({
//  providedIn: 'root'
//})
export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;
  maxLength:number;  
  minLength:number;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxLength = options['maxLength'] || (options['max'] || 50);    
    this.minLength = options['minLength'] || (options['min'] || 0);    
  }
}


export class NumbersQuestion extends QuestionBase<string> {
  controlType = 'numbers';
  type: string; 
  currency:boolean=false;
  //currencySymbol:string='R';


  constructor(options: {} = {} ) { 
    super(options);
    //if(options['required']|| false){
      this.value = options['value']|| '0';
      if(this.value===''){
        this.value='0';
      } 
      this.defaultValue=0;
    //}
    
    this.type = options['type'] || ''; 
    this.currency = options['currency'] || false;
    //this.currencySymbol = options['symbol'] || 'R';
    if(this.currency===true){
      this.controlType = "currency";
      this.defaultValue=0.00;
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/