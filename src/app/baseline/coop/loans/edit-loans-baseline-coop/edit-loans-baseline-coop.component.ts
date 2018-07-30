import { Component, OnInit ,Input,Output,EventEmitter,OnChanges} from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms'; 
import {forceValidate} from '../../../../service/custom-from-helper-control.service'

@Component({
  selector: 'app-edit-loans-baseline-coop',
  templateUrl: './edit-loans-baseline-coop.component.html',
  styleUrls: ['./edit-loans-baseline-coop.component.css']
})
export class EditLoansBaselineCoopComponent implements OnInit {
  @Input() finance: any;
  @Output() addFinance:EventEmitter<any> = new EventEmitter<any>();
  loanEdit:FormGroup;
  binload:boolean = false;
  constructor() { }
  ngOnChanges(changes: any){
    console.log(changes);
    if(changes.finance){
      if(this.binload){
        this.loanEdit.patchValue(this.finance);
      }
      
    }
  }
  ngOnInit() {
    this.loanEdit = new FormGroup({
      Where_Apply: new FormControl('1',Validators.required),
      Reject_Reason: new FormControl(''), 
      How_Much: new FormControl('0.00',Validators.required), 
      Approved: new FormControl('0') ,
      Started_Repay: new FormControl(''),
      Amount_Issued: new FormControl(''),
      Repay_Amount: new FormControl('',Validators.required) 
    },[forceValidate("!Approved",[{name:"Reject_Reason",min:1,max:50}]),
    forceValidate("Started_Repay",[{name:"Repay_Amount"}])]);
    this.loanEdit.patchValue(this.finance);
    console.log(this.finance);
    this.binload = true;
    //this.finance.Where_Apply="dddd";
  }
  addnewFinance(){
    this.addFinance.emit(this.loanEdit.value);
    this.loanEdit.reset();
  }
  get getValue(){
    return this.loanEdit.value;
  } 
}
