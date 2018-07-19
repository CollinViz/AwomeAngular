import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CustomFromHelperControlService } from '../../../../service/custom-from-helper-control.service'

@Component({
  selector: 'app-edit-dialog-actionplans-enterprises',
  templateUrl: './edit-dialog-actionplans-enterprises.component.html',
  styles: []
})
export class EditDialogActionplansEnterprisesComponent implements OnInit {
  ActionPlanEdit:any={};
  constructor(
    public dialogRef: MatDialogRef<EditDialogActionplansEnterprisesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formHelper :CustomFromHelperControlService) {}
    ngOnInit() {
      this.ActionPlanEdit = Object.assign({},this.data)
    }
  onNoClick(): void {
    this.dialogRef.close({Resulet:'Close',data:null});
  }
  Save(): void{
    //Check Dates are OK
    this.ActionPlanEdit.Date_Updated = this.formHelper.getDateValue(new Date());
     
    //Only if new 
    if(!this.ActionPlanEdit.ActionPlan_ID){
      this.ActionPlanEdit.Date_Created = this.formHelper.getDateValue(new Date());
    }
    this.ActionPlanEdit.Owner=0;
    //if(this.ActivityEdit.Status==='Complete'){
    //  this.ActivityEdit.Comp_Date = this.formHelper.getDateValue(new Date());
    //}
    this.dialogRef.close({Resulet:'Save',data:this.ActionPlanEdit});
  }

}
