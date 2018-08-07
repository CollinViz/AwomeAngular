import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { EwepserverService } from '../../../ewepserver.service'
@Component({
  selector: 'app-listenterprise',
  templateUrl: './listenterprise.component.html',
  styleUrls: ['./listenterprise.component.css']
})
export class ListenterpriseComponent implements OnInit {
  columns = [
    { name: 'Enterprise ID', prop: 'Enterprise_ID' },
    { name: 'Enterprise Name', prop: 'Enterprise_Name' },
    { name: 'Year Est', prop: 'Year_Established' },
    //{ name: 'Structure', prop: 'Legal_Structure' },
    { name: 'Female Owners', prop: 'Female_Owners' },
    //{ name: 'Province', prop: 'Province' },
    //{ name: 'EDF', prop: 'EDF' },
    { name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  SearchFilter:string = "";

  constructor(private router: Router, private EwepserverService: EwepserverService) {
    this.getPageofEnterprise();
  }

  getPageofEnterprise() {
    
    this.EwepserverService.getEnterprisList(this.page.pageNumber,this.SearchFilter).subscribe((customers: any) => {
       
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
    this.getPageofEnterprise();
  }
  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Enterprise_ID);
      this.router.navigateByUrl('baseline/enterprise/' + this.selected[0].Enterprise_ID);
    }

  }
  searchClick(SearchString){
    this.SearchFilter= SearchString;
    this.page.totalElements=0;
    this.page.totalPages=0;
    this.page.pageNumber=0;
    this.getPageofEnterprise();
  }
  addNew(AddString){
    console.log('Activate Event', AddString);
    this.router.navigateByUrl('/enterprise/-1');
  }

}
