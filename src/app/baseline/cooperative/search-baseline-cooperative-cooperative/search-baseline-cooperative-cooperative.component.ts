import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {EwepserverService} from '../../../ewepserver.service'

@Component({
  selector: 'app-search-baseline-cooperative-cooperative',
  templateUrl: './search-baseline-cooperative-cooperative.component.html',
  styles: []
})
export class SearchBaselineCooperativeCooperativeComponent implements OnInit {
  search = {Name:"",Year_Established:"",Province:"Select",Legal_Structure:"Select",HiHRep:"Select",Sector:"Select"}
  Provinces =[];
  ActiveEDFs =[];
  @Output() filter:string ="";
  @Output() SearchClick = new EventEmitter<string>();
  constructor(private EwepserverService: EwepserverService) {

    EwepserverService.getProvince().subscribe((customers:any)=>{
      console.log(customers.records);
      this.Provinces = customers.records; 
    });
    EwepserverService.getActiveEDF().subscribe((efflist:any)=>{
      this.ActiveEDFs = efflist.records;
    });
   }

  ngOnInit() {
  }
  searchClickint(){
    let aFilter:string[]=[];
    if(this.search.Name!=""){
      aFilter.push("filter=Cooperative_Name,cs," + this.search.Name);
    }
    if(this.search.Year_Established!=""){
      aFilter.push("filter=Year_Established,eq," + this.search.Year_Established);
    }
    if(this.search.Province!="" && this.search.Province!="Select"){
      aFilter.push("filter=Province_ID,eq," + this.search.Province);
    }
    if(this.search.Legal_Structure!="" && this.search.Legal_Structure!="Select"){
      aFilter.push("filter=Legal_Structure,eq," + this.search.Legal_Structure);
    }
    if(this.search.Sector!="" && this.search.Sector!="Select"){
      aFilter.push("filter="+this.search.Sector+",eq,1");
    }
    this.filter = aFilter.join("&"); 
    this.SearchClick.emit(this.filter);
  }
}
