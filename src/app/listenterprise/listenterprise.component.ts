import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { EwepserverService } from '../ewepserver.service'
@Component({
  selector: 'app-listenterprise',
  templateUrl: './listenterprise.component.html',
  styleUrls: ['./listenterprise.component.css']
})
export class ListenterpriseComponent implements OnInit {
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


  constructor(private router: Router, private EwepserverService: EwepserverService) {
    this.getPageofEnterprise();
  }

  getPageofEnterprise() {
    this.EwepserverService.getEnterprisList(this.page.pageNumber).subscribe((customers: any) => {
       
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
      this.router.navigateByUrl('/enterprise/' + this.selected[0].Enterprise_ID);
    }

  }


}
