import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-visits-cooperative-page',
  templateUrl: './visits-cooperative-page.component.html',
  styles: []
})
export class VisitsCooperativePageComponent implements OnInit {
  columns = [
    { name: 'Coop ID', prop: 'Cooperative_ID' },
    { name: 'Name', prop: 'Cooperative_Name' },
    { name: 'Year Est', prop: 'Year_Established' },
    { name: 'Structure', prop: 'Legal_Structure' },
    { name: 'Owners', prop: 'Female_Owners' },
    { name: 'Province', prop: 'Province' },
    { name: 'EDF', prop: 'EDF' },
    { name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  SearchFilter:string = "";

  constructor(private router: Router, private EwepserverService: EwepserverService) {
    this.getPageofCooperative();
  }

  ngOnInit() {
  }
  getPageofCooperative() {
    
    this.EwepserverService.getCooperativeList(this.page.pageNumber,this.SearchFilter).subscribe((customers: any) => {
       
      this.rows = [...customers.records];
      this.page.totalElements = customers.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
  }
  
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPageofCooperative();
  }
  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Cooperative_ID);
      this.router.navigateByUrl('visits/cooperative/' + this.selected[0].Cooperative_ID);
    }

  }
  searchClick(SearchString){
    this.SearchFilter= SearchString;
    this.page.totalElements=0;
    this.page.totalPages=0;
    this.page.pageNumber=0;
    this.getPageofCooperative();
  }

}
