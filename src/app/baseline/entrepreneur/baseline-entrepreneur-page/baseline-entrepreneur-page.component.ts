
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EwepserverService } from '../../../ewepserver.service';


@Component({
  selector: 'app-baseline-entrepreneur-page',
  templateUrl: './baseline-entrepreneur-page.component.html',
  styles: []
})
export class BaselineEntrepreneurPageComponent implements OnInit {

  columns = [
    { name: 'ID', prop: 'Entrepreneur_ID' },
    { name: 'Surname', prop: 'Surname' },
    { name: 'Name', prop: 'Name' },
    { name: 'Municipality', prop: 'Municipality' },
    //{ name: 'EDF', prop: 'EDF' },
    //{ name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 0 };
  SearchFilter = "";
  // tslint:disable-next-line:no-inferrable-types
  IsEditing: boolean = false;
  EntrepreneurEditItem: any = {};
  constructor(private activatedRoute: ActivatedRoute, private EwepserverService: EwepserverService) { }

  getPageOfEntrepreneurs() {
    const strOptions = "page=" + (Number(this.page.pageNumber) + 1) + "," + this.page.size +"&filter=Country_ID,eq,"+this.EwepserverService.SelectedCountryID +  "&orderby=surname&" + this.SearchFilter;
    this.EwepserverService.getViewData("entrepreneur_view", strOptions).subscribe((myjsondata: any) => {
      this.rows = [...myjsondata.records];
      this.page.totalElements = myjsondata.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
  }
  ngOnInit() {

    //check the routing fisrt
    this.activatedRoute.params
      // NOTE: I do not use switchMap here, but subscribe directly
      .subscribe((params: Params) => {
        if (params.Entrepreneur_ID) {
          console.log(params.Entrepreneur_ID);
          this.EwepserverService.getRowData("entrepreneur", params.Entrepreneur_ID).subscribe((en) => {
            this.IsEditing = true;
            this.EntrepreneurEditItem = en;
          });

        } else {
          console.log("No Data", params);
          this.getPageOfEntrepreneurs();
        }
      });

  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPageOfEntrepreneurs();
  }
  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Entrepreneur_ID);
      //this.router.navigateByUrl('/enterprise/' + this.selected[0].Enterprise_ID);
      this.IsEditing = true;
      this.EntrepreneurEditItem = this.selected[0];
    }

  }
  searchClick(SearchString) {
    this.SearchFilter = SearchString;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.getPageOfEntrepreneurs();
  }
  NewClick() {
    this.IsEditing = true;
    this.EntrepreneurEditItem = { Entrepreneur_ID: -1, ID_or_Passport: 'ID' };
  }
  onSaveEntrepreneur(NewOrEditEntrepreneur) {
    if (NewOrEditEntrepreneur === null) {
      if (this.rows.length > 0) {
        this.IsEditing = false;
      } else {
        this.IsEditing = false;
        this.getPageOfEntrepreneurs();
      }

      return;
    }
    //Do Stuff to save and reload grid
    //Test if we need to create or edit
    if (NewOrEditEntrepreneur.Entrepreneur_ID == -1) {
      //create
      delete NewOrEditEntrepreneur.Entrepreneur_ID;
      this.EwepserverService.CreateTableData("entrepreneur", NewOrEditEntrepreneur).subscribe((newID) => {
        //Add user to Enterprise 
        this.getPageOfEntrepreneurs();
        this.IsEditing = false;
      });
    } else {
      //update
      this.EwepserverService.updateTableData("entrepreneur", NewOrEditEntrepreneur.Entrepreneur_ID, NewOrEditEntrepreneur).subscribe((Data) => {
        //Find ID and update 
        this.getPageOfEntrepreneurs();
        this.IsEditing = false;
      })
    }
  }

}
