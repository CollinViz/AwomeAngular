import { Component, OnInit } from '@angular/core'; 
import { EwepserverService } from '../../../ewepserver.service'


@Component({
  selector: 'app-training-entrepreneurs-page',
  templateUrl: './training-entrepreneurs-page.component.html',
  styles: []
})
export class TrainingEntrepreneursPageComponent implements OnInit {
  columns = [
    { name: 'ID', prop: 'Entrepreneur_ID' },
    { name: 'Name', prop: 'Name' }, 
    { name: 'Surname', prop: 'Surname' }, 
    { name: 'Province', prop: 'Province' } 
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  SearchFilter:string = "";
  IsEditing:boolean = false;
  EntrepreneurEditItem:any = {};
  TrainingList:any[] = [];
  ActiveEDFs:any[] = []
  constructor(private EwepserverService: EwepserverService) { }

  ngOnInit() {
    this.getPageOfEntrepreneurs();
    this.getTrainingList();
    this.getTrainersList();
  }
  getPageOfEntrepreneurs() {
    let strOptions="page="+this.page.pageNumber+"&orderby=surname&"+ this.SearchFilter;
    this.EwepserverService.getViewData("entrepreneur_view", strOptions).subscribe((myjsondata: any) => {
     this.rows = [...myjsondata.records];
     this.page.totalElements = myjsondata.results;
     this.page.totalPages = this.page.totalElements / this.page.size;
    });
  } 
  getTrainingList(){
    this.EwepserverService.getTableData("trainings","orderby=Title").subscribe(jsonData=>{
      this.TrainingList = jsonData.records;
    });
  }
  getTrainersList(){
    this.EwepserverService.getActiveEDF().subscribe((efflist:any)=>{
      this.ActiveEDFs = efflist.records;
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
 searchClick(SearchString){
   this.SearchFilter= SearchString;
   this.page.totalElements=0;
   this.page.totalPages=0;
   this.page.pageNumber=0;
   this.getPageOfEntrepreneurs();
 }
 NewClick(){
   this.IsEditing = true;
   this.EntrepreneurEditItem = {Entrepreneur_ID:-1};
 }
 onReload(){
  this.IsEditing = false;
 }
}
