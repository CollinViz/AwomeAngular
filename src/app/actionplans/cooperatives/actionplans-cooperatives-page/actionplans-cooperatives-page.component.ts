import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-actionplans-cooperatives-page',
  templateUrl: './actionplans-cooperatives-page.component.html',
  styles: []
})
export class ActionplansCooperativesPageComponent implements OnInit {


  columns = [
    { name: 'ID', prop: 'Cooperative_ID' },
    { name: 'Name', prop: 'Cooperative_Name' },
    { name: 'Number of Action Plans', prop: 'Actionplans_Count' },
    { name: 'Completed', prop: 'Completed' },
    { name: 'In Progress', prop: 'In_Progress' },
    { name: 'Overdue', prop: 'Overdue' }/*,
    { name: 'EDF', prop: 'EDF' },
    { name: 'Status', prop: 'Status' }*/
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 0 };
  SearchFilter: string = "";

  constructor(private router: Router, public EwepserverService: EwepserverService) {
    this.getPageofCooperative();
  }

  getPageofCooperative() {

    const strOptions = "page=" + (Number(this.page.pageNumber) + 1) + "," + this.page.size + 
                     "&orderby=cooperative_name" + (this.SearchFilter === "" ? "" : "&" + this.SearchFilter);
    //this.EwepserverService.getViewData("cooperative_base_view", strOptions).subscribe((myjsondata_coop: any) => {
    this.EwepserverService.getViewData("cooperative_actionplans_count_view", strOptions).subscribe((myjsondata_coop: any) => {
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
      this.router.navigateByUrl('actionplans/cooperatives/' + this.selected[0].Cooperative_ID);
    }

  }
  searchClick(SearchString) {
    this.SearchFilter = SearchString;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.getPageofCooperative();
  }

}
