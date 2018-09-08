import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-baseline-association-page',
  templateUrl: './baseline-association-page.component.html',
  styles: []
})
export class BaselineAssociationPageComponent implements OnInit {

  columns = [
    { name: 'ID', prop: 'Association_ID' },
    { name: 'Name', prop: 'Association_Name' },
    { name: 'Year Est', prop: 'Year_Established' }, 
    { name: 'Female Members', prop: 'Female_Members' } 
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  SearchFilter:string = "";

  constructor(private router: Router, private EwepserverService: EwepserverService) {
    this.getPageofCooperative();
  }

  getPageofCooperative() {
    
    let strOptions="page="+this.page.pageNumber+"&orderby=Association_Name";
     //this.EwepserverService.getViewData("association", strOptions).subscribe((myjsondata_coop: any) => {
     this.EwepserverService.getTableData("association", strOptions).subscribe((myjsondata_coop: any) => {
      this.rows = [...myjsondata_coop.records];
      this.page.totalElements = myjsondata_coop.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
  }
  ngOnInit() {




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
      console.log('Activate Event', event, this.selected[0].Association_ID);
      this.router.navigateByUrl('baseline/association/' + this.selected[0].Association_ID);
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
