import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-listcoop',
  templateUrl: './listcoop.component.html',
  styleUrls: ['./listcoop.component.css']
})
export class ListcoopComponent implements OnInit {
  columns = [
    { name: 'ID', prop: 'Cooperative_ID' },
    { name: 'Name', prop: 'Cooperative_Name' },
    { name: 'Year Est', prop: 'Year_Established' },
    { name: 'Cooperative Type', prop: 'Legal_Structure' },
    { name: 'Owners', prop: 'Female_Owners' },
    { name: 'Province', prop: 'Province' },
    { name: 'EDF', prop: 'EDF' },
    { name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 0 };
  SearchFilter: string = "";

  constructor(private router: Router,  public EwepserverService: EwepserverService) {
    this.getPageofCooperative();
  }

  getPageofCooperative() {

    this.EwepserverService.getCooperativeList((Number(this.page.pageNumber) + 1), this.SearchFilter).subscribe((customers: any) => {

      this.rows = [...customers.records];
      this.page.totalElements = customers.results;
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
      this.EwepserverService.addToRoutingStashBox(this.selected[0]);
      this.router.navigateByUrl('baseline/cooperative/' + this.selected[0].Cooperative_ID);
    }

  }
  searchClick(SearchString) {
    this.SearchFilter = SearchString;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.getPageofCooperative();
  }
  addNew(AddString) {
    console.log('Activate Event', AddString);
    this.EwepserverService.addToRoutingStashBox({ Cooperative_ID: -1 });
    this.router.navigateByUrl('baseline/cooperative/-1');
  }

}
