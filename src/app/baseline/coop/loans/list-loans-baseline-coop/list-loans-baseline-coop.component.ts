import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-loans-baseline-coop',
  templateUrl: './list-loans-baseline-coop.component.html',
  styleUrls: ['./list-loans-baseline-coop.component.css']
})
export class ListLoansBaselineCoopComponent implements OnInit {
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
