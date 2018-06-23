import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-editprogram',
  templateUrl: './editprogram.component.html',
  styleUrls: ['./editprogram.component.css']
})
export class EditprogramComponent implements OnInit {
  programme:any 
  BaseTable = "programme";
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private EwepserverService: EwepserverService) { 

  }

  ngOnInit() {
    this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.programmeID);
      if(params.programmeID){
        if(params.programmeID>0){
          this.EwepserverService.getRowData(this.BaseTable,params.programmeID).subscribe((customers:any)=>{
            console.log(customers);
            this.programme = customers; 
          });
        }
      }
    });
  }
  
  saveClicked(){
    //this.SaveClick.emit(this.programme);
  }
  closedClicked(){
    //this.CancelClick.emit();
  }
}
