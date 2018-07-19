import { Component,  AfterViewInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-com-list-action-plan',
  templateUrl: './com-list-action-plan.component.html',
  styleUrls: ['./com-list-action-plan.component.css']
})
export class ComListActionPlanComponent implements  AfterViewInit {
  @Input() ActionList:any[];
  @Input() ActiveAction:any;
  @Output() ItemClick = new EventEmitter<number>();
  @Output() editItemClick = new EventEmitter<number>();
  @Output() deleteItemClick = new EventEmitter<number>();
  intLastItemClick:number=-1;
  constructor() { } 
   
  ngAfterViewInit(){
    //this.intLastItemClick =-1;
  }
  Click(event,Index){ 
    if(this.intLastItemClick>-1){
      if(this.intLastItemClick<=this.ActionList.length){
        if(this.ActionList[this.intLastItemClick].active){
          this.ActionList[this.intLastItemClick].active=false;
        }
      }
    }
    //console.log(this.ActionList,Index,this.ActionList[Index]);
    this.ActionList[Index].active=true;
    this.intLastItemClick = Index;
    this.ActiveAction = this.ActionList[Index];
    this.ItemClick.emit(Index);
  }
  deleteItem(event,Index){
    this.deleteItemClick.emit(Index);
  }
  editItem(event,Index){
    this.editItemClick.emit(Index);
  }
}
