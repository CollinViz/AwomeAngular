import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 
@Component({
  selector: 'app-delete-check',
  templateUrl: './delete-check.component.html',
  styleUrls: []
})
export class DeleteCheckComponent implements OnInit {
  message:string = "";
  constructor(public dialogRef: MatDialogRef<DeleteCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { 
      this.message = this.data;
    }

  ngOnInit() {
  }
  CancelClick(){
    this.dialogRef.close({Result:'Close',data:null});
  }
  OkClick(){
    this.dialogRef.close({Result:'Ok',data:null});
  }
}
//Result
