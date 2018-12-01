import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service'
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
@Component({
  selector: 'app-actionplans-enterprises-page',
  templateUrl: './actionplans-enterprises-page.component.html',
  styles: []
})
export class ActionplansEnterprisesPageComponent implements OnInit {
  columns = [
    { name: 'ID', prop: 'Enterprise_ID' },
    { name: 'Name', prop: 'Enterprise_Name' },
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

  constructor(private router: Router,
    private EwepserverService: EwepserverService) {
    this.getPageofEnterprise();
  }

  ngOnInit() {
  }
  getPageofEnterprise() {
    const strOptions = "page=" + (Number(this.page.pageNumber) + 1) + "," + this.page.size + 
                     "&orderby=enterprise_name" + (this.SearchFilter === "" ? "" : "&" + this.SearchFilter);
    //this.EwepserverService.getEnterprisList(this.page.pageNumber,this.SearchFilter).subscribe((customers: any) => {
    this.EwepserverService.getViewData("enterprise_actionplans_count_view", strOptions).subscribe((myjsondata_ent: any) => {
      this.rows = [...myjsondata_ent.records];
      this.page.totalElements = myjsondata_ent.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPageofEnterprise();
  }
  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Enterprise_ID);
      this.router.navigateByUrl('/actionplans/enterprises/' + this.selected[0].Enterprise_ID);
    }

  }
  searchClick(SearchString) {
    this.SearchFilter = SearchString;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.getPageofEnterprise();
  }
}
