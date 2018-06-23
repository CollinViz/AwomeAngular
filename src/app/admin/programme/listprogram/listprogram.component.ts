import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-listprogram',
  templateUrl: './listprogram.component.html',
  styleUrls: ['./listprogram.component.css']
})
export class ListprogramComponent implements OnInit {
  BaseTable = "programme";
  columns = [
    { name: 'ID', prop: 'Programme_ID' },
    { name: 'Name', prop: 'Programme_Name' },
    { name: 'Active', prop: 'Active' }
  ];
  @Input() rows: any[] = [];
  @Output() selected:any[] = [];
  @Output() SelectClick = new EventEmitter<number>();
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }

  constructor(private router: Router, private EwepserverService: EwepserverService) {
    
  }
  getPrograms() {
    this.EwepserverService.getTableData(this.BaseTable, "orderby=Programme_Name&page=" + this.page.pageNumber).subscribe((customers: any) => {

      this.rows = [...customers.records];
      this.page.totalElements = customers.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });

  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPrograms();
  }
  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', this.selected[0].Programme_ID);
      //this.router.navigateByUrl('/admin/programme/' + this.selected[0].Programme_ID);
      this.SelectClick.emit(this.selected[0].Programme_ID);
    }

  }
  ngOnInit() {
    this.getPrograms();
  }

}
