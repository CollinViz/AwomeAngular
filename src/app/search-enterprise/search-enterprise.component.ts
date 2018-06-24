import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {EwepserverService} from '../ewepserver.service'

@Component({
  selector: 'app-search-enterprise',
  templateUrl: './search-enterprise.component.html',
  styleUrls: ['./search-enterprise.component.css']
})
export class SearchEnterpriseComponent implements OnInit {
  search = {Name:"",Year_Established:"",Province:"Select",Legal_Structure:"Select",HiHRep:"Select",Sector:"Select"}
  Provinces =[];
  ActiveEDFs =[];
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

}
