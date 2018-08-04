import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import {EwepserverService} from '../../../ewepserver.service'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@Component({
  selector: 'app-editcoop',
  templateUrl: './editcoop.component.html',
  styleUrls: ['./editcoop.component.css']
})
export class EditcoopComponent implements OnInit {
  cooperative:any={};
  Provinces =[];
  DistrictMetroAll =[];
  DistrictMetro =[];
  localMunicipalityAll =[];
  localMunicipality =[];
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private EwepserverService: EwepserverService) { 
    /*EwepserverService.getProvince().subscribe((customers:any)=>{
      console.log(customers.records);
      this.Provinces = customers.records; 
    });
    EwepserverService.getDistrictMetro().subscribe((customers:any)=>{
      console.log(customers.records);
      this.DistrictMetroAll = customers.records; 
    });
    EwepserverService.getlocalMunicipality().subscribe((customers:any)=>{
      console.log(customers.records);
      this.localMunicipalityAll = customers.records; 
    });*/

  }

  ngOnInit() {
    this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Cooperative_ID);
      if(params.Cooperative_ID){
        if(params.Cooperative_ID>0){
          this.EwepserverService.getEnterprisItem(params.Cooperative_ID).subscribe((customers:any)=>{
            console.log(customers);
            this.cooperative = customers; 
          });
        }
      }
    });



  }

}
