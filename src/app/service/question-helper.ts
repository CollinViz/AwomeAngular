export class Options {
    Key:any
    Value:any 
    constructor(KeyValue:any,ValueValue:any){
      this.Key = KeyValue;
      this.Value = ValueValue;
    }
  }

  export class CheckBoxOptions {
    Key:any
    Text:string
    Value:any
    required:boolean = false; 
    constructor(KeyValue:any,TextValue:string,ValueValue:any){
      this.Key = KeyValue;
      this.Value = ValueValue;
      this.Text = TextValue;
    }
  }