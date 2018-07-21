import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Observable } from 'rxjs';
import {EwepserverService} from '../../../ewepserver.service'


@Component({
  selector: 'app-search-baseline-cooperative-cooperative',
  templateUrl: './search-baseline-cooperative-cooperative.component.html',
  styles: []
})
export class SearchBaselineCooperativeCooperativeComponent implements OnInit {
  search = {Name:"",Year_Established:""}
   
  HeadingInfo:string = "Baseline Info";
  @Input() Heading?:string="";
  @Input() hidAdd?:boolean=false;
  @Output() filter:string ="";
  @Output() SearchClick = new EventEmitter<string>();
  @Output() NewClick = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    if(this.Heading){
      if(this.Heading==""){
        this.Heading = this.HeadingInfo;
      }
    }
  }

  searchClickint(){
    let aFilter:string[]=[];
    if(this.search.Name!=""){
      aFilter.push("filter=Cooperative_Name,cs," + this.search.Name);
    }
    if(this.search.Year_Established!=""){
      aFilter.push("filter=Year_Established,eq," + this.search.Year_Established);
    } 
    this.filter = aFilter.join("&"); 
    this.SearchClick.emit(this.filter);
  }
  addClick(){
    this.NewClick.emit("add");
  }

}
