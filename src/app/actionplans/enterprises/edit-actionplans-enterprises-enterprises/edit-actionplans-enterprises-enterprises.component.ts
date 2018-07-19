import { ChangeDetectorRef,Component, OnInit,Inject, PipeTransform,TemplateRef, Output  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup ,Validators,FormBuilder} from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service' 
import { QuestionBase } from '../../../service/question-base'; 
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditDialogActionplansEnterprisesEnterprisesComponent} from './../../../common/actionplan/edit-dialog-actionplans-enterprises-enterprises/edit-dialog-actionplans-enterprises-enterprises.component'
import {EditDialogActionplansEnterprisesComponent} from './../../../common/actionplan/edit-dialog-actionplans-enterprises/edit-dialog-actionplans-enterprises.component'
@Component({
  selector: 'app-edit-actionplans-enterprises-enterprises',
  templateUrl: './edit-actionplans-enterprises-enterprises.component.html',
  styles: []
})
export class EditActionplansEnterprisesEnterprisesComponent implements OnInit {
  ActivityTable:string = "actionplans_activity";
  ActionPlanTable:string = "actionplans";
  
  enterprise:any = {};
  actionplans:any[] = [];
  actionplansAll:any[] = [];
  activitylist:any[] =[]; 
  activeActionPlan:any={};
  selectedActivity:any = {};
  isLoading:boolean= true; 
  Enterprise_ID=-1;
  bShowAdd:boolean=false;
  actionType_select:string ="InProgress";
  Sort_select:string = "CreateDate";
  showloadingActivity:boolean = false

  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private EwepserverService: EwepserverService, public dialog: MatDialog,
  private formHelper :CustomFromHelperControlService ) { 
         
    }
    getActivity(ActionID:number){
      this.showloadingActivity = true;
      this.EwepserverService.getTableData(this.ActivityTable,"filter=ActionPlan_ID,eq,"+ActionID).subscribe((actionlist:any)=>{
        this.activitylist = actionlist.records;
        this.showloadingActivity = false;
      })  ;
    }
    getActionPlan(){
      //load actions plans 
      this.EwepserverService.getTableData(this.ActionPlanTable,"Enterprise_ID,eq,"+this.Enterprise_ID).subscribe((actionplanraw:any)=>{
        this.actionplansAll = actionplanraw.records; 
        this.changeFilter(null);       
        //console.log(actionplanraw.records);
        this.OnDataOK();
      });
    }
  ngOnInit() {
    this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Enterprise_ID);
      if(params.Enterprise_ID){
        if(params.Enterprise_ID>0){
          this.Enterprise_ID = params.Enterprise_ID;
          this.EwepserverService.getEnterprisItem(params.Enterprise_ID).subscribe((customers:any)=>{
            //console.log(customers);
            this.enterprise = customers; 
            this.getActionPlan();
            //this.OnDataOK();
          });
        } 
      }
    });
  }
  changeSort(event){
    console.log("changeSort ",this.Sort_select,event);
    this.activitylist = this.activitylist.sort((a,b )=>{
      if(this.Sort_select=="CreateDate"){
        //console.log(a.Date_Created,b.Date_Created);
        a = new Date(a.Date_Created);
        b = new Date(b.Date_Created);
        //console.log(a,b);
      }else{
        a = new Date(this.getCorrectTargetDate(a));
        b = new Date(this.getCorrectTargetDate(b));
      }
      
      return a<b ? -1 : a>b ? 1 : 0;
    })
  }
  changeFilter(event){
    if(event!=null){
      if(event.value){
        this.actionType_select = event.value;
      }
    }  
    //Reset selection
    this.actionplansAll.forEach((Value)=>{
      Value.active= false;
    });
    this.OnDataOK();
    
    if(this.actionType_select=="All"){
      this.actionplans = this.actionplansAll;
      return;
    }
    this.actionplans = this.actionplansAll.filter((element)=>{
      return (element.Status===this.actionType_select)
    });
  }
  OnDataOK(){
    this.isLoading = false;
    this.activitylist=[];
    this.bShowAdd= false;
  }
  AddActionPlan(){
    const dialogRef = this.dialog.open(EditDialogActionplansEnterprisesComponent, {
     
      data: {Owner:1,Description:'',Enterprise_ID:this.Enterprise_ID}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed',result);
      if(result.Resulet==='Save'){
        let newActionPlan = Object.assign({},result.data);
         
        this.EwepserverService.CreateTableData(this.ActionPlanTable,
          newActionPlan).subscribe((outputinfo:any)=>{
            console.log(outputinfo);
            newActionPlan.ActionPlan_ID = outputinfo;
            this.actionplans.push(newActionPlan);
          });
      }  
    });

  }
  actionEditClick(index){
    const dialogRef = this.dialog.open(EditDialogActionplansEnterprisesComponent, {
     
      data: this.actionplans[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed',result);
      if(result.Resulet==='Save'){
        let newActionPlan = Object.assign({},result.data);
                 
        this.EwepserverService.updateTableData(this.ActionPlanTable,
          newActionPlan.ActionPlan_ID,
          newActionPlan).subscribe((outputinfo:any)=>{
            console.log(outputinfo);
            this.actionplans[index] = newActionPlan;            
          });
      }  
    });
  }
  actionDeleteClick(index){
    const strMessage = this.actionplans[index].Description;
    this.formHelper.showConfirmDelete(strMessage).subscribe(result=>{
      if(result.Resulet==='Ok'){
        let strKey = this.activitylist.map(item=> item.Activity_ID).join(",");
        console.log("Delete key ",strKey);
        this.EwepserverService.deleteTableData(this.ActivityTable,strKey).subscribe(resalt=>{
          console.log(resalt);
          this.EwepserverService.deleteTableData(this.ActionPlanTable,this.actionplans[index].ActionPlan_ID).subscribe(resalt=>{
            this.getActionPlan();
          });
        });
      }else{
        console.log("Do not delete");
      }
    });
  }
  actionClick(index){
    this.activeActionPlan = this.actionplans[index];
    //load sub action
    this.getActivity(this.actionplans[index].ActionPlan_ID);
    this.bShowAdd= true;
  }
  AddActivity(){
    const dialogRef = this.dialog.open(EditDialogActionplansEnterprisesEnterprisesComponent, {
     
      data: {ActionPlan_ID:this.activeActionPlan.ActionPlan_ID,
             Status:"Open"}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed',result);
      if(result.Resulet==='Save'){
        //Fix Dates
        const selectitem = Object.assign({},result.data);
        selectitem.ActionPlan_ID = this.activeActionPlan.ActionPlan_ID;
        selectitem.Date_Created = this.formHelper.getDateValue(new Date());
        delete selectitem.Activity_ID 
        //this.activitylist[index] = selectitem;
        this.EwepserverService.CreateTableData(this.ActivityTable,
           selectitem).subscribe((outputinfo:any)=>{
            console.log(outputinfo);
            this.activitylist.push(selectitem);
          })
      }  
    });
  }
  editItem(index:number){
    this.selectedActivity = this.activitylist[index]; 
    //show dialog box 
    const dialogRef = this.dialog.open(EditDialogActionplansEnterprisesEnterprisesComponent, {     
      data: this.selectedActivity
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result.Resulet==='Save'){ 
         
        const selectitem = Object.assign({},result.data);
         
        this.activitylist[index] = selectitem;
        this.EwepserverService.updateTableData(this.ActivityTable,
          this.selectedActivity.Activity_ID,selectitem).subscribe((outputinfo:any)=>{
            console.log(outputinfo);
            this.activitylist[index]=selectitem;
          });
      }  
    });
  }
  deleteItem(index:number){
    const strMessage = this.activitylist[index].Description;
    this.formHelper.showConfirmDelete(strMessage).subscribe(result=>{
      if(result.Resulet==='Ok'){
        this.EwepserverService.deleteTableData(this.ActivityTable,this.activitylist[index].Activity_ID).subscribe(deleteInfo=>{
           
          this.activitylist.slice(index,1);
        });
      }else{
        console.log("Do not delete");
      }
    });
  }
  //Duplication from common\actionplan\com-list-action-plans-activity\com-list-action-plans-activity.component.ts
  getCorrectTargetDate(ActivityItem:any) {
    if(ActivityItem.Target_Date2!=null){
      if(ActivityItem.Target_Date2.trim()!=""){
        return ActivityItem.Target_Date2;
      }
    }
    if(ActivityItem.Target_Date1!=null){
      if(ActivityItem.Target_Date1.time()!=""){
        return ActivityItem.Target_Date1;
      }      
    }
    return ActivityItem.Target_Date;
  }
}


 