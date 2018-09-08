import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service' 
import { Options, QuestionBase,DropdownQuestion} from '../../../service/question';
import { CustomFromHelperControlService,forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import { FormGroupEditMemberBaselineEnterprise } from './edit-member-baseline-enterprise'
@Component({
  selector: 'app-edit-member-baseline-enterprise',
  templateUrl: './edit-member-baseline-enterprise.component.html',
  styles: []
})
export class EditMemberBaselineEnterpriseComponent implements OnInit,OnChanges {
  
  @Input() entrepreneur:any = {}
  @Output() SaveItem:EventEmitter<any> = new EventEmitter<any>();
  MainForm:FormGroup;
  General:FormGroup;
  training:FormGroup;
  Contact:FormGroup;
  isLoading:boolean = true;
  Language:Options[];
  Race:Options[];
  Sex:Options[];
  MaritalStatus:Options[];
  EducationLevel:Options[] = [];

  ContactInfo:QuestionBase<any>[];
  ContactInfoWithBinding:QuestionBase<any>[];

  constructor(private EwepserverService: EwepserverService,
              private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService) { 
                this.Language = this.EwepserverService.Language;
                this.Race = this.EwepserverService.Race;
                this.Sex = this.EwepserverService.Sex;
                this.MaritalStatus = this.EwepserverService.MaritalStatus;
                this.EducationLevel = this.EwepserverService.EducationLevel;
              }
  ngOnChanges(changes){
    if(this.isLoading){
      return;
    }
    if(changes.entrepreneur){
      this.MainForm.patchValue(this.entrepreneur);
    }
  }
  ngOnInit() {
    this.isLoading =true;
    let oFromTemp:FormGroupEditMemberBaselineEnterprise = new FormGroupEditMemberBaselineEnterprise(); 
    this.General = this.cutomerFormHlper.toFormGroup(oFromTemp.getGeneral(this.entrepreneur));
    this.training = this.cutomerFormHlper.toFormGroup(oFromTemp.getTraining(this.entrepreneur));

    this.ContactInfo = this.controlsService.getContactInfoNonBinding(this.entrepreneur);
    this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding(this.entrepreneur);

    this.Contact = this.cutomerFormHlper.toFormGroup(this.ContactInfo,this.ContactInfoWithBinding);
//Bank_Account
    //this.Contact = this.cutomerFormHlper.toFormGroup(oFromTemp.getContact(this.entrepreneur));
    this.MainForm = new FormGroup({
      General:this.General,
      training:this.training,
      Contact:this.Contact
    },[forceValidate("General.Support_Other",[{name:"General.Support_Specify",UseLengthValidation:true,min:1,max:50}]),
       forceValidate("General.Challenge",[{name:"General.Challenge_Specify",UseLengthValidation:true,min:1,max:50}],"Challenge_Other")]);
    this.isLoading =false;
  }
  Save(){
    let entrepreneur = this.cutomerFormHlper.flattenObject(this.MainForm.value);

    entrepreneur["Expiration_Date"] = this.cutomerFormHlper.getDateValue(this.General.get('Expiration_Date').value);
    entrepreneur["Birth_Date"] = this.cutomerFormHlper.getDateValue(this.General.get("Birth_Date").value);
    entrepreneur["Date_Join_Awome"] = this.cutomerFormHlper.getDateValue(this.General.get("Date_Join_Awome").value);
 
    if(this.entrepreneur.Entrepreneur_ID){
      entrepreneur["Entrepreneur_ID"] =this.entrepreneur.Entrepreneur_ID;
    }else{
      entrepreneur["Entrepreneur_ID"] =-1;
      entrepreneur["Date_Created"] = this.cutomerFormHlper.getDateValue(new Date());
    }
    this.SaveItem.emit(entrepreneur);
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
