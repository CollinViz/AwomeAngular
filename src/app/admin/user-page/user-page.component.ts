import { Component, OnInit,EventEmitter, Output, Input,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';  
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'; 
import { EwepserverService } from '../../ewepserver.service'


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  BaseTable = "edf";
  modalRef: BsModalRef;
  columns = [
    { name: 'Name', prop: 'Name' },
    { name: 'Surname', prop: 'Surname' },
    { name: 'UserName', prop: 'UserName' },
    { name: 'Province', prop: 'Province_Name' },
    { name: 'Programme', prop: 'Programme_Name' },
    { name: 'Reports To Name', prop: 'Reports_To_Name' },
    { name: 'Reports To Surname', prop: 'Reports_To_Surname' },
    { name: 'Active', prop: 'Active' } ];
  rows: any[] = [];
  selected:any[] = [];
  SelectedRowData:any;
  Province:any[];
  Titles:any[];
  Programme:any[];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  showEdit:boolean = false;

  constructor(private modalService: BsModalService,private router: Router, private EwepserverService: EwepserverService) {
    
  }
  getUsers() {
    this.EwepserverService.getViewData("edf_view", "orderby=Name&page=" + this.page.pageNumber).subscribe((customers: any) => {

      this.rows = customers.records;
      this.page.totalElements = customers.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
    this.showEdit = false;
  }
  getLookupData(){
    this.Province = this.EwepserverService.province;
     
    this.EwepserverService.getTableData("titles","").subscribe((TitleDb)=>{
      this.Titles = TitleDb.records;
      this.EwepserverService.getTableData("programme","filter=Active,eq,1").subscribe((programdb:any)=>{
        this.Programme = programdb.records;
      }); });
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getUsers();
  }
  onActivate(event,template: TemplateRef<any>) {
    if (event.type === "click") {
      console.log('Activate Event', this.selected[0].Programme_ID);
      this.SelectedRowData = Object.assign({}, this.selected[0]);; 
      this.showEdit= true;
    }

  }
  ngOnInit() {
    this.getUsers();
    this.getLookupData();
  }

  
  Save(){
    //this.selected[0] = Object.assign({},this.SelectedRowData);++
    console.log("Save Data with",this.SelectedRowData.Active);
    //this.SelectedRowData.Active = this.SelectedRowData.Active===true?"Y":"N";
    if(this.SelectedRowData.EDF_ID===0){
      this.EwepserverService.CreateTableData(this.BaseTable,this.SelectedRowData).subscribe((data:string)=> {
         
        this.getUsers();
        
        
      })
    }else{
      this.EwepserverService.updateTableData(this.BaseTable,this.SelectedRowData.EDF_ID,this.SelectedRowData).subscribe((data:any)=> {
        this.getUsers();
      })
    }
    
    this.showEdit = false;

  }
  Add(template: TemplateRef<any>){
    this.showEdit = true;
    this.SelectedRowData = {EDF_ID:0,Name:"",Surname:"",Active:"Y",Approver_Y_N:"Y"}; 
    //this.modalRef = this.modalService.show(template);

  }

}
