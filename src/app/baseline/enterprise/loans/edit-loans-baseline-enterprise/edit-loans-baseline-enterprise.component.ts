import { Component, OnInit ,Input,Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-edit-loans-baseline-enterprise',
  templateUrl: './edit-loans-baseline-enterprise.component.html',
  styleUrls: ['./edit-loans-baseline-enterprise.component.css']
})
export class EditLoansBaselineEnterpriseComponent implements OnInit {
  @Input() finance: any;
  loanEdit:FormGroup;
  constructor() { }

  ngOnInit() {
    this.loanEdit = new FormGroup({
      Where_Apply: new FormControl('1'),
      Reject_Reason: new FormControl('BOB'), 
      How_Much: new FormControl('BOB'), 
      Approved: new FormControl('BOB') ,
      Started_Repay: new FormControl('BOB') 
    });
    this.loanEdit.patchValue(this.finance);
    //this.finance.Where_Apply="dddd";
  }

}
