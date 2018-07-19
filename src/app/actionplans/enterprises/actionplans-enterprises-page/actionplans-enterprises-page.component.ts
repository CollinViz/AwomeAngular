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

  constructor(private router: Router, 
              private EwepserverService: EwepserverService ) { 
    this.getPageofEnterprise();
  }

  ngOnInit() {
  }
  getPageofEnterprise() {
    
    this.EwepserverService.getEnterprisList(this.page.pageNumber,this.SearchFilter).subscribe((customers: any) => {
       
      this.rows = [...customers.records];
      this.page.totalElements = customers.results;
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
  searchClick(SearchString){
    this.SearchFilter= SearchString;
    this.page.totalElements=0;
    this.page.totalPages=0;
    this.page.pageNumber=0;
    this.getPageofEnterprise();
  }
}
