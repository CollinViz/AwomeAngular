import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-list-loans-baseline-enterprise',
  templateUrl: './list-loans-baseline-enterprise.component.html',
  styleUrls: ['./list-loans-baseline-enterprise.component.css']
})
export class ListLoansBaselineEnterpriseComponent implements OnInit {
  @Input() rows:any;
  columns = [
    { name: 'Where_Apply', prop: 'Where_Apply' },
    { name: 'Approved', prop: 'Approved' },
    { name: 'Reject_Reason', prop: 'Reject_Reason' },
    { name: 'Reject_Specify', prop: 'Reject_Specify' },
    { name: 'How_Much', prop: 'How_Much' },
    { name: 'Started_Repay', prop: 'Started_Repay' } 
  ];
  constructor() { }

  ngOnInit() {
  }
  
  onActivate(event){

  }
}
