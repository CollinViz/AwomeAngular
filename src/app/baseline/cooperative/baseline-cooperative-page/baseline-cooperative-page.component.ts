import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-baseline-cooperative-page',
  templateUrl: './baseline-cooperative-page.component.html',
  styles: []
})
export class BaselineCooperativePageComponent implements OnInit {

  columns = [
    { name: 'ID', prop: 'Cooperative_ID' },
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

  getPageofCooperative() {
    
    let strOptions="page="+this.page.pageNumber+"&orderby=cooperative_name";
     this.EwepserverService.getViewData("cooperative_base_view", strOptions).subscribe((myjsondata_coop: any) => {
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
      console.log('Activate Event', event, this.selected[0].Cooperative_ID);
      this.router.navigateByUrl('baseline/cooperative/' + this.selected[0].Cooperative_ID);
    }

  }
  NewClick(event){
    this.router.navigateByUrl('baseline/cooperative/-1');
  }
  searchClick(SearchString){
    this.SearchFilter= SearchString;
    this.page.totalElements=0;
    this.page.totalPages=0;
    this.page.pageNumber=0;
    this.getPageofCooperative();
  }

}
