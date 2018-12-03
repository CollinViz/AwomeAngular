import { Component, OnInit ,Input,Output,EventEmitter,OnChanges} from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms'; 
import {forceValidate} from '../../../../service/custom-from-helper-control.service'
import { EwepserverService } from '../../../../ewepserver.service'

@Component({
  selector: 'app-edit-loans-baseline-enterprise',
  templateUrl: './edit-loans-baseline-enterprise.component.html',
  styleUrls: ['./edit-loans-baseline-enterprise.component.css']
})
export class EditLoansBaselineEnterpriseComponent implements OnInit,OnChanges {
  @Input() finance: any;
  @Output() addFinance:EventEmitter<any> = new EventEmitter<any>();
  loanEdit:FormGroup;
  binload:boolean = false;
  CurrencyValue:string="R";
  constructor(public EwepserverService:EwepserverService) { }
  ngOnChanges(changes: any){
    console.log(changes);
    if(changes.finance){
      if(this.binload){
        this.loanEdit.patchValue(this.finance);
      }
      
    }
  }
  ngOnInit() {
    this.CurrencyValue = this.EwepserverService.SelectedCurrency;
    this.loanEdit = new FormGroup({
      Where_Apply: new FormControl('1',Validators.required),       
      Approved: new FormControl('0') , 
      Amount_Issued: new FormControl('',Validators.required),
      Repay_Amount: new FormControl('',Validators.required), 
      Amount_Outstanding:  new FormControl('',Validators.required) 
    }  );
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
