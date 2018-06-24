import { Component, OnInit,EventEmitter, Output, Input,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';  
import { FormsModule }   from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'; 
import { EwepserverService } from '../../ewepserver.service'

@Component({
  selector: 'app-programme-page',
  templateUrl: './programme-page.component.html',
  styleUrls: ['./programme-page.component.css']
})
export class ProgrammePageComponent implements OnInit {
  BaseTable = "programme";
  modalRef: BsModalRef;
  columns = [
    { name: 'ID', prop: 'Programme_ID' },
    { name: 'Name', prop: 'Programme_Name' },
    { name: 'Active', prop: 'Active' }
  ];
  rows: any[] = [];
  selected:any[] = [];
  SelectedRowData:any;
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }

  constructor(private modalService: BsModalService,private router: Router, private EwepserverService: EwepserverService) {
    
  }
  getPrograms() {
    this.EwepserverService.getTableData(this.BaseTable, "orderby=Programme_Name&page=" + this.page.pageNumber).subscribe((customers: any) => {

      this.rows = customers.records;
      this.page.totalElements = customers.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });

  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPrograms();
  }
  onActivate(event,template: TemplateRef<any>) {
    if (event.type === "click") {
      console.log('Activate Event', this.selected[0].Programme_ID);
      this.SelectedRowData = Object.assign({}, this.selected[0]);; 
      this.modalRef = this.modalService.show(template);
    }

  }
  ngOnInit() {
    this.getPrograms();
  }

  Save(){
    //this.selected[0] = Object.assign({},this.SelectedRowData);++
    console.log("Save Data with",this.SelectedRowData.Active);
    //this.SelectedRowData.Active = this.SelectedRowData.Active===true?"Y":"N";
    if(this.SelectedRowData.Programme_ID===0){
      this.EwepserverService.CreateTableData(this.BaseTable,this.SelectedRowData).subscribe((data:any)=> {
        this.getPrograms();
      })
    }else{
      this.EwepserverService.updateTableData(this.BaseTable,this.SelectedRowData.Programme_ID,this.SelectedRowData).subscribe((data:any)=> {
        this.getPrograms();
      })
    }
    
    this.modalRef.hide();

  }
  Add(template: TemplateRef<any>){

    this.SelectedRowData = {Programme_ID:0,Programme_Name:"",Active:"Y"}; 
    this.modalRef = this.modalService.show(template);

  }

}
