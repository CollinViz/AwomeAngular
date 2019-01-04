import { Component, OnInit,Inject } from '@angular/core'; 
import { EwepserverService } from '../../../ewepserver.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-entrepreneur',
  templateUrl: './list-entrepreneur.component.html',
  styles: []
})
export class ListEntrepreneurComponent implements OnInit {
  columns = [
    { name: 'ID', prop: 'Entrepreneur_ID' },
    { name: 'Surname', prop: 'Surname' },
    { name: 'Name', prop: 'Name' } 
    //{ name: 'EDF', prop: 'EDF' },
    //{ name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 10, totalElements: 500, totalPages: 25, pageNumber: 0 }
  SearchFilter: string = "";

  constructor( public EwepserverService: EwepserverService,
    public dialogRef: MatDialogRef<ListEntrepreneurComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getPageOfEntrepreneurs();
  }

  getPageOfEntrepreneurs() {
    let strOptions = "page=" + (Number(this.page.pageNumber) + 1) + ","+ this.page.size +"&filter=Country_ID,eq,"+this.EwepserverService.SelectedCountryID +  "&orderby=surname&" + this.SearchFilter;
    this.EwepserverService.getViewData("entrepreneur_view", strOptions).subscribe((myjsondata: any) => {
      this.rows = [...myjsondata.records];
      this.page.totalElements = myjsondata.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
  }
  ngOnInit() {
  }
  searchClick(SearchString) {
    this.SearchFilter = SearchString;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.getPageOfEntrepreneurs();
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getPageOfEntrepreneurs();
  }
  onSelect() {
    //console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log('Activate Event', event, this.selected[0]);
      this.dialogRef.close({ Resulet: 'Save',data:this.selected[0] });
    }

  }
}
