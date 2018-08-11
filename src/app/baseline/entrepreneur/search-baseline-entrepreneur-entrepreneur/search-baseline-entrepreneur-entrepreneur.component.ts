import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
 
import {EwepserverService,Province} from '../../../ewepserver.service'
@Component({
  selector: 'app-search-baseline-entrepreneur-entrepreneur',
  templateUrl: './search-baseline-entrepreneur-entrepreneur.component.html',
  styles: []
})
export class SearchBaselineEntrepreneurEntrepreneurComponent implements OnInit {
  search = {Name:"",Year_Established:"",Province:"Select",Legal_Structure:"Select",HiHRep:"Select",Sector:"Select"}
  HeadingInfo:string = "Baseline Info";
  Provinces:Province[] = [];
  @Input() Heading?:string="";
  @Input() hidAdd?:boolean=false;
  @Output() filter:string ="";
  @Output() SearchClick = new EventEmitter<string>();
  @Output() NewClick = new EventEmitter<string>();
  constructor(private EwepserverService:EwepserverService) { 
    
  }

  ngOnInit() {
    this.Provinces = this.EwepserverService.province;
     
    if(this.Heading==""){
      this.Heading = this.HeadingInfo;
    }
     
  }
  addClick(){
    this.NewClick.emit("add");
  }
  searchClickint(){
    let aFilter:string[]=[];
    if(this.search.Name!=""){
      aFilter.push("filter1=Name,cs," + this.search.Name);
      aFilter.push("filter2=Surname,cs," + this.search.Name);
    }
     
    if(this.search.Province!="" && this.search.Province!="Select"){
      aFilter.push("filter=Province_ID,eq," + this.search.Province);
    }
     
    this.filter = aFilter.join("&"); 
    this.SearchClick.emit(this.filter);

  }
}
