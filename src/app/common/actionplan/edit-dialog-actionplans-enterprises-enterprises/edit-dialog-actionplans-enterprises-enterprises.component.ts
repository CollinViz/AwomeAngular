import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
import { EwepserverService } from '../../../ewepserver.service'

@Component({
  selector: 'app-edit-dialog-actionplans-enterprises-enterprises',
  templateUrl: './edit-dialog-actionplans-enterprises-enterprises.component.html',
  styleUrls: ['./edit-dialog-actionplans-enterprises-enterprises.component.css']
})
export class EditDialogActionplansEnterprisesEnterprisesComponent implements OnInit {
  ActivityEdit:any={};

  constructor(public EwepserverService: EwepserverService,
    public dialogRef: MatDialogRef<EditDialogActionplansEnterprisesEnterprisesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formHelper :CustomFromHelperControlService) {}
    ngOnInit() {
      this.ActivityEdit = Object.assign({},this.data)
    }
  onNoClick(): void {
    this.dialogRef.close({Resulet:'Close',data:null});
  }

  Save(): void{
    if(!this.ActivityEdit.ActionPlan_ID){
      this.ActivityEdit.Date_Created = this.formHelper.getDateValue(new Date());
    }
    //Check Dates are OK
    this.ActivityEdit.Date_Updated = this.formHelper.getDateValue(new Date());
    this.ActivityEdit.Target_Date = this.formHelper.getDateValue(this.ActivityEdit.Target_Date);
    this.ActivityEdit.Target_Date1 = this.formHelper.getDateValue(this.ActivityEdit.Target_Date1);
    this.ActivityEdit.Target_Date2 = this.formHelper.getDateValue(this.ActivityEdit.Target_Date2);
    this.ActivityEdit.Owner=0;
    if(this.ActivityEdit.Status==='Complete'){
      this.ActivityEdit.Comp_Date = this.formHelper.getDateValue(new Date());
    }else{
      delete this.ActivityEdit.Comp_Date
    }
    this.dialogRef.close({Resulet:'Save',data:this.ActivityEdit});
  }
}
