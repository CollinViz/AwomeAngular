import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-loans-baseline-enterprise',
  templateUrl: './list-loans-baseline-enterprise.component.html',
  styleUrls: ['./list-loans-baseline-enterprise.component.css']
})
export class ListLoansBaselineEnterpriseComponent implements OnInit {
  @Input() rows:any;
  @Output() ItemClick = new EventEmitter<number>();
  displayedColumns: string[] = ['Where_Apply', 'Approved', 'Reject_Reason' ];
  constructor() { }

  ngOnInit() {
  }
  
  onActivate(event){
    
    this.ItemClick.emit(event)
  }
}
