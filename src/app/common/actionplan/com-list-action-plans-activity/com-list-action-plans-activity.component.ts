import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { EwepserverService } from '../../../ewepserver.service'
@Component({
  selector: 'app-com-list-action-plans-activity',
  templateUrl: './com-list-action-plans-activity.component.html',
  styleUrls: ['./com-list-action-plans-activity.component.css']
})
export class ComListActionPlansActivityComponent implements OnInit {
  @Input() active:any={};
  @Input() Index:number=0;
  @Output() deleteItemClick = new EventEmitter<number>();
  @Output() editItemClick = new EventEmitter<number>();
  constructor(public EwepserverService: EwepserverService) { }

  ngOnInit() {
  }
  deleteItem_(){
    this.deleteItemClick.emit(this.Index);
  }
  editItem_(){
    this.editItemClick.emit(this.Index);
  }
  isComplete(ActivityItem:any){
    if(ActivityItem.Status==="Complete")
      return true;
    return false;
  }
  isRed(ActivityItem:any){
    if(ActivityItem.Status==="Complete")
      return false;
      let d = new Date(this.getCorrectTargetDate(ActivityItem));
      if(d>new Date()){
        //not red
        return false;
      } 
    return true;
  }
  isThisMonth(ActivityItem:any){
    if(ActivityItem.Status==="Complete")
      return false;
    let d = new Date(this.getCorrectTargetDate(ActivityItem));
    if(d>new Date()){
      if(d.getMonth()==(new Date()).getMonth()){
        return true;
      }
    }
    return false;
  }
  getCorrectTargetDate(ActivityItem:any) {
    if(ActivityItem.Target_Date2!=null){
      if(ActivityItem.Target_Date2.trim()!=""){
        return ActivityItem.Target_Date2;
      }
    }
    if(ActivityItem.Target_Date1!=null){
      if(ActivityItem.Target_Date1.time()!=""){
        return ActivityItem.Target_Date1;
      }      
    }
    return ActivityItem.Target_Date;
  }

}
