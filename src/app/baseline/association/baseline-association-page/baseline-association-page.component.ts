import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-baseline-association-page',
  templateUrl: './baseline-association-page.component.html',
  styles: []
})
export class BaselineAssociationPageComponent implements OnInit {

  columns = [
    { name: 'ID', prop: 'Association_ID' },
    { name: 'Name', prop: 'Association_Name' },
    { name: 'Year Est', prop: 'Year_Established' },
    { name: 'Female Members', prop: 'Female_Members' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 0 };
  SearchFilter: string = "";
  IsEditing: boolean = false;
  AssociationEditItem: any = {};
  constructor(private router: Router, private EwepserverService: EwepserverService) {
    this.getPageOfAssociations();
  }

  getPageOfAssociations() {
    let strOptions = "page=" + ( Number(this.page.pageNumber) + 1) + "," + this.page.size + "&orderby=surname&" + this.SearchFilter;
    this.EwepserverService.getViewData("association_view", strOptions).subscribe((myjsondata: any) => {
      this.rows = [...myjsondata.records];
      this.page.totalElements = myjsondata.results;
      this.page.totalPages = (this.page.totalElements / this.page.size)+1;
    });
  }
  ngOnInit() {
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPageOfAssociations();
  }
  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Association_ID);
      //this.router.navigateByUrl('/enterprise/' + this.selected[0].Enterprise_ID);
      this.IsEditing = true;
      this.AssociationEditItem = this.selected[0];
      this.router.navigateByUrl('baseline/association/' + this.selected[0].Association_ID);
    }

  }
  searchClick(SearchString) {
    this.SearchFilter = SearchString;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.getPageOfAssociations();
  }
  NewClick() {
    this.IsEditing = true;
    this.AssociationEditItem = { Association_ID: -1 };
  }
  onSaveAssociation(NewOrEditAssociation) {
    if (NewOrEditAssociation === null) {
      this.IsEditing = false;
      return;
    }
    //Do Stuff to save and reload grid
    //Test if we need to create or edit
    if (NewOrEditAssociation.Association_ID == -1) {
      //create
      delete NewOrEditAssociation.Association_ID;
      this.EwepserverService.CreateTableData("association", NewOrEditAssociation).subscribe((newID) => {
        //Add user to Enterprise 
        this.getPageOfAssociations();
        this.IsEditing = false;
      });
    } else {
      //update
      this.EwepserverService.updateTableData("association", NewOrEditAssociation.Association_ID, NewOrEditAssociation).subscribe((Data) => {
        //Find ID and update 
        this.getPageOfAssociations();
        this.IsEditing = false;
      })
    }
  }

}