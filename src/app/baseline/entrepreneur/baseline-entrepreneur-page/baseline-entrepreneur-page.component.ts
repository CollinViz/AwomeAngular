import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { EwepserverService } from '../../../ewepserver.service'


@Component({
  selector: 'app-baseline-entrepreneur-page',
  templateUrl: './baseline-entrepreneur-page.component.html',
  styles: []
})
export class BaselineEntrepreneurPageComponent implements OnInit {

  columns = [
    { name: 'ID', prop: 'Entrepreneur_ID' },
    { name: 'Name', prop: 'Surname' }, 
    { name: 'Province', prop: 'Province' },
    { name: 'EDF', prop: 'EDF' },
    { name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  SearchFilter:string = "";

  constructor(private router: Router, private EwepserverService: EwepserverService) {
    this.getPageOfEntrepreneurs();
   }

   getPageOfEntrepreneurs() {
     let strOptions="page="+this.page.pageNumber+"&orderby=surname";
     this.EwepserverService.getViewData("entrepreneur_view", strOptions).subscribe((myjsondata: any) => {
      this.rows = [...myjsondata.records];
      this.page.totalElements = myjsondata.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
     });
   }
  ngOnInit() {
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPageOfEntrepreneurs();
  }
  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Entrepreneur_ID);
      //this.router.navigateByUrl('/enterprise/' + this.selected[0].Enterprise_ID);
    }

  }
  searchClick(SearchString){
    this.SearchFilter= SearchString;
    this.page.totalElements=0;
    this.page.totalPages=0;
    this.page.pageNumber=0;
    this.getPageOfEntrepreneurs();
  }

}
