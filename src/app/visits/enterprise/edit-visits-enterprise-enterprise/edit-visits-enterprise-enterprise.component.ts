import { ChangeDetectorRef,Component, OnInit,Pipe, PipeTransform,TemplateRef  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service'
import {CustomFromHelperControlService} from '../../../service/custom-from-helper-control.service'

@Component({
  selector: 'app-edit-visits-enterprise-enterprise',
  templateUrl: './edit-visits-enterprise-enterprise.component.html',
  styles: []
})
export class EditVisitsEnterpriseEnterpriseComponent implements OnInit {
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
  SearchFilter:string = "";

  enterprise:any={};
  Enterprise_ID:number=-1;
  blistShow:boolean = true;
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService) { 
      this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Enterprise_ID);
      if(params.Enterprise_ID){
        if(params.Enterprise_ID>0){
          this.Enterprise_ID =  params.Enterprise_ID;
          this.EwepserverService.getEnterprisItem(params.Enterprise_ID).subscribe((customers:any)=>{
            //console.log(customers);
            this.enterprise = customers; 
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
    let strOptions="filter=Enterprise_ID,eq,"+this.Enterprise_ID+ "&page=" +this.page.pageNumber;
    this.EwepserverService.getTableData("enterprise_visits",strOptions).subscribe(VisitListData=>{
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
      console.log('Activate Event', event, this.selected[0].Enterprise_ID);
      this.blistShow=false;
     // this.router.navigateByUrl('visits/enterprise/' + this.selected[0].Enterprise_ID);
    }

  }
  addVisit(){
    this.blistShow=false;
  }
}
