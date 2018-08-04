export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    min:number;
    max:number;
    defaultValue:any;
    //forceRequired:string[];

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        min?:number,
        max?:number,
        defaultValue?:any,
        //forceRequired?:string[],
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.min = options.min || 0;
      this.max = options.max || 0;
      this.defaultValue = options.defaultValue || '';
      //this.forceRequired = options.forceRequired || [];
    }
  }
  
  
  /*
  Copyright 2017-2018 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
  */