import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service' 
import { Options, QuestionBase,DropdownQuestion} from '../../../service/question';
import { CustomFromHelperControlService,forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import { FormGroupEditAssociation } from './edit-association'
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-edit-baseline-association-association',
  templateUrl: './edit-baseline-association-association.component.html',
  styles: []
})
export class EditBaselineAssociationAssociationComponent implements OnInit,OnChanges {

  @Input() association:any = {}
  @Output() SaveItem:EventEmitter<any> = new EventEmitter<any>();
  @Output() DeletedItem:EventEmitter<any> = new EventEmitter<any>();
  MainForm:FormGroup;
  Details:FormGroup;
  Leadership:FormGroup;
  Contact:FormGroup;
  isLoading:boolean = true;
  /*Language:Options[];
  Race:Options[];
  Sex:Options[];
  MaritalStatus:Options[];
  EducationLevel:Options[] = [];*/

  ContactInfo:QuestionBase<any>[];
  ContactInfoWithBinding:QuestionBase<any>[];

  constructor( public EwepserverService: EwepserverService,
              private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService,
              public dialog: MatDialog) { 
                /*this.Language = this.EwepserverService.Language;
                this.Race = this.EwepserverService.Race;
                this.Sex = this.EwepserverService.Sex;
                this.MaritalStatus = this.EwepserverService.MaritalStatus;
                this.EducationLevel = this.EwepserverService.EducationLevel;*/
              }
  ngOnChanges(changes){
    if(this.isLoading){
      return;
    }
    if(changes.association){
      this.MainForm.patchValue(this.association);
    }
  }
  ngOnInit() {
    this.isLoading =true;
    let oFromTemp:FormGroupEditAssociation = new FormGroupEditAssociation(); 
    this.Details = this.cutomerFormHlper.toFormGroup(oFromTemp.getDetails(this.association));
    this.Leadership = this.cutomerFormHlper.toFormGroup(oFromTemp.getLeadership(this.association));

    this.ContactInfo = this.controlsService.getContactInfoNonBinding(this.association);
    this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding(this.association);

    this.Contact = this.cutomerFormHlper.toFormGroup(this.ContactInfo,this.ContactInfoWithBinding);

    //this.Contact = this.cutomerFormHlper.toFormGroup(oFromTemp.getContact(this.association));
    this.MainForm = new FormGroup({
      Details:this.Details,
      Leadership:this.Leadership,
      Contact:this.Contact
    });
    this.isLoading =false;
  }
  Delete(){
    this.cutomerFormHlper.showConfirmDelete(this.association.Association_Name ).subscribe(result=>{
      if(result.Result==='Ok'){
        this.EwepserverService.deleteAssociation(this.association.Association_ID).subscribe((message:any)=>{
          if(message.OK==="OK"){
            alert("Association deleted");             
          }else{
            alert("Error " + message.message);             
          }
          this.DeletedItem.emit(null);
        });
      }
    });

  }
  Save(){
    let association = this.cutomerFormHlper.flattenObject(this.MainForm.value);

    /*association["Expiration_Date"] = this.cutomerFormHlper.getDateValue(this.General.get('Expiration_Date').value);
    association["Birth_Date"] = this.cutomerFormHlper.getDateValue(this.General.get("Birth_Date").value);*/
    association["Date_Established"] = this.cutomerFormHlper.getDateValue(this.Details.get("Date_Established").value);
    association["Country_ID"] = this.EwepserverService.SelectedCountryID;
    if(this.association.Association_ID){
      association["Association_ID"] =this.association.Association_ID;
    }else{
      association["Association_ID"] =-1;
      association["Date_Created"] = this.cutomerFormHlper.getDateValue(new Date());
    }
    this.SaveItem.emit(association);
  }
  Back(){
    this.SaveItem.emit(null);
  }

  contaceDetailChange(event, Index) {
    console.log(event, Index);
    let d = <DropdownQuestion>this.ContactInfoWithBinding[Index];
    let d1 = null;
    switch (d.key) {
      case "Province_ID":
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.EwepserverService.districtMetro.filter((element) => {
          return element.Province_ID == event.value;
        }).map((value) => new Options(value.DistrictMetro_ID, value.Name))
        break;
      case "District_Metro_ID":
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.EwepserverService.localMunicipality.filter((element) => {
          return element.DistrictMetro_ID == event.value;
        }).map((value) => new Options(value.LocalMunicipality_ID, value.Name))
        break;
      case "Municipality_ID":
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.EwepserverService.mainPlaces.filter((element) => {
          return element.LocalMunicipality_ID == event.value
        }).map((value) => new Options(value.MainPlace_ID, value.Name))
        break;
    }

  }

}
