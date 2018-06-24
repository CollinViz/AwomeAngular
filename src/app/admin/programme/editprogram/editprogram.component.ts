import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { EwepserverService } from '../../../ewepserver.service'
 

@Component({
  selector: 'app-editprogram',
  templateUrl: './editprogram.component.html',
  styleUrls: ['./editprogram.component.css']
})
export class EditprogramComponent implements OnInit {
  
  BaseTable = "programme";
  @Input() programme : any;
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private EwepserverService: EwepserverService) { 

  }

  ngOnInit() {
     
  }
  
  saveClicked(){
    //this.SaveClick.emit(this.programme);
  }
  closedClicked(){
    //this.CancelClick.emit();
  }
}
