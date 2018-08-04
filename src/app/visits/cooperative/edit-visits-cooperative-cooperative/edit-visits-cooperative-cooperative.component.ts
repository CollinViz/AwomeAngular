import { ChangeDetectorRef,Component, OnInit,Pipe, PipeTransform,TemplateRef  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service'
import {CustomFromHelperControlService} from '../../../service/custom-from-helper-control.service'

@Component({
  selector: 'app-edit-visits-cooperative-cooperative',
  templateUrl: './edit-visits-cooperative-cooperative.component.html',
  styles: []
})
export class EditVisitsCooperativeCooperativeComponent implements OnInit {
  columns = [
    { name: 'Visit ID', prop: 'Cooperative_Visit_ID' },
    { name: 'Coop ID', prop: 'Cooperative_ID' },
    { name: 'Name', prop: 'Cooperative_Name' },
    { name: 'Visit Date', prop: 'Visit_Date' },
    { name: 'Visit Year', prop: 'Visit_Year' },
    { name: 'Visit Quarter', prop: 'Visit_Quarter' },
    { name: 'Status', prop: 'Status' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 1 }
  SearchFilter:string = "";

  cooperative:any={};
  Cooperative_Visit_ID:number=1;
  Cooperative_ID:number=-1;
  blistShow:boolean = true;
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService) { 
      this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Cooperative_ID);
      //console.log(params.Cooperative_Visit_ID);
      if(params.Cooperative_ID){ 
        if(params.Cooperative_ID>0){
          this.Cooperative_ID =  params.Cooperative_ID;
          this.Cooperative_Visit_ID =  params.Cooperative_Visit_ID;
          //this.EwepserverService.getCooperativeItem(params.Cooperative_ID).subscribe((customers:any)=>{
           // this.EwepserverService.getViewData('cooperative_visits_view', params.Cooperative_ID).subscribe((customers:any)=>{
            //  this.EwepserverService.getRowData('cooperative_visits', params.Cooperative_Visit_ID).subscribe((customers:any)=>{
            //console.log(customers);
            this.EwepserverService.getCooperativeItem(params.Cooperative_ID).subscribe((customers:any)=>{
            this.cooperative = customers; 
            this.OnDataOK();
          });
        }
      }
    });
    }

  ngOnInit() {
  }

  OnDataOK(){
    this.getVisitorList();
  }
  getVisitorList(){
    let strOptions="filter=Cooperative_ID,eq,"+this.Cooperative_ID+ "&page=" +this.page.pageNumber;
    //this.EwepserverService.getTableData("cooperative_visits_view",strOptions).subscribe(VisitListData=>{
    this.EwepserverService.getViewData("cooperative_visits_view",strOptions).subscribe(VisitListData=>{
      this.rows = [...VisitListData.records];
      this.page.totalElements = VisitListData.results;
      this.page.totalPages = this.page.totalElements / this.page.size;
    });
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getVisitorList();
  }
  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
  }
  backtoList(){
    this.blistShow=true;
  }
  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].Cooperative_ID);
      this.blistShow=false;
     // this.router.navigateByUrl('visits/cooperative/' + this.selected[0].Cooperative_ID);
    }

  }
  addVisit(){
    this.blistShow=false;
  }
}
