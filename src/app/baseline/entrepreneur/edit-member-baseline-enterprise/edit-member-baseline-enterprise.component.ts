import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service' 
import { Options, QuestionBase,DropdownQuestion} from '../../../service/question';
import { CustomFromHelperControlService,forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import { FormGroupEditMemberBaselineEnterprise } from './edit-member-baseline-enterprise'
import { max } from '../../../../../node_modules/rxjs/operators';
@Component({
  selector: 'app-edit-member-baseline-enterprise',
  templateUrl: './edit-member-baseline-enterprise.component.html',
  styles: []
})
export class EditMemberBaselineEnterpriseComponent implements OnInit,OnChanges {
  
  birthMinDate = new Date(1938, 0, 1);
  birthMaxDate = new Date(2000,12,31);
  passportMinDate = new Date(2018, 0, 1);
  passportMaxDate = new Date(2030,12,31);
  awomeMinDate = new Date(2018, 0, 1);
  awomeMaxDate = new Date();
  ID_Passport_text="IDaaa";
  //maxDate1 = new Date(maxDate().getDateValue - 1);
  //maxDate = new Date(2020, 0, 1);
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
  CurrencyValue:string = "R";
  IDorPassport:Options[];

  ContactInfo:QuestionBase<any>[];
  ContactInfoWithBinding:QuestionBase<any>[];
  //Grid for connections
  columnsEnterprise = [
    { name: 'ID', prop: 'Enterprise_ID' },
    { name: 'Name', prop: 'Enterprise_Name' } 
  ];
  rowsEnterprise: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 0 };
  columnsCooperative = [
    { name: 'ID', prop: 'Cooperative_ID' },
    { name: 'Name', prop: 'Cooperative_Name' } 
  ];
  rowsCooperative: any[] = []; 

  constructor(private EwepserverService: EwepserverService,
              private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService) { 
                this.Language = this.EwepserverService.Language;
                this.Race = this.EwepserverService.Race;
                this.Sex = this.EwepserverService.Sex;
                this.MaritalStatus = this.EwepserverService.MaritalStatus;
                this.EducationLevel = this.EwepserverService.EducationLevel;
                this.IDorPassport = this.EwepserverService.IDorPassport;
              }
  ngOnChanges(changes){
    if(this.isLoading){
      return;
    }
    if(changes.entrepreneur){
      //Fix ID
      
      this.MainForm.patchValue(this.entrepreneur);
      this.loadLinks();
    }
  }
  ngOnInit() {
    this.CurrencyValue = this.EwepserverService.SelectedCurrency;
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
       forceValidate("General.Challenge",[{name:"General.Challenge_Specify",UseLengthValidation:true,min:1,max:50}],"Challenge_Other"),
       forceValidate("General.Is_Disabled",[{name:"General.Disabled_Specify",UseLengthValidation:true,min:1,max:50}]) 
        ]);

      this.ID_Passport_text = this.entrepreneur.ID_or_Passport;
    this.isLoading =false;
    this.loadLinks();
  }
  Save(){
    let entrepreneur = this.cutomerFormHlper.flattenObject(this.MainForm.value);

    entrepreneur["Expiration_Date"] = this.cutomerFormHlper.getDateValue(this.General.get('Expiration_Date').value);
    entrepreneur["Birth_Date"] = this.cutomerFormHlper.getDateValue(this.General.get("Birth_Date").value);
    entrepreneur["Date_Join_Awome"] = this.cutomerFormHlper.getDateValue(this.General.get("Date_Join_Awome").value);
    entrepreneur["Country_ID"] = this.EwepserverService.SelectedCountryID;
 
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
  loadLinks(){
    //enterprise_member_view
    this.EwepserverService.getViewData("enterprise_member_view","filter=Entrepreneur_ID,eq,"+this.entrepreneur.Entrepreneur_ID).subscribe((rowdata: any)=>{
      this.rowsEnterprise = [...rowdata.records];
    });
    this.EwepserverService.getViewData("cooperative_member_view","filter=Entrepreneur_ID,eq,"+this.entrepreneur.Entrepreneur_ID).subscribe((rowdata: any)=>{
      this.rowsCooperative = [...rowdata.records];
    });
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
