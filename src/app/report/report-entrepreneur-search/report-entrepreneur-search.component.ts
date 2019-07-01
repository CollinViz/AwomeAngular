import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EwepserverService } from '../../ewepserver.service';

//import { Options, QuestionBase,DropdownQuestion} from '../../service/question';
//import { CustomformSetupService } from '../../service/customform-setup.service';

import { QuestionBase } from '../../service/question-base';
import { DropdownQuestion } from '../../service/question-dropdown';
import { CustomformSetupService } from '../../service/customform-setup.service'
import { Options } from '../../service/question-helper';

import { CustomFromHelperControlService,forceValidate } from '../../service/custom-from-helper-control.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-entrepreneur-search',
  templateUrl: './report-entrepreneur-search.component.html',
  styleUrls: ['./report-entrepreneur-search.component.css']
})
export class ReportEntrepreneurSearchComponent implements OnInit {

  search = { Province: "Select", DistrictMetro: "Select", Municipality: "Select", Race: "", Sex: "", Age: "Select", EducationLevel: "Select", MaritalStatus: "Select", Trainer: "Select", NoOfChildren: "Select", NoOfPeopleHousehold: "Select", NoOfPeopleSupported: "Select" };
  Provinces = [];
  DistrictMetros = [];
  Municipalities = [];
  EducationLevel = [];
  CountryID;
  ActiveEDFs = [];
  Age= [];
  NoOfChildren=[];
  NoOfPeopleHousehold=[];
  NoOfPeopleSupported=[];
  @Output() SearchClick = new EventEmitter<any>();
  @Output() filter:string ="";
  @Input() Heading?: string = "";
  @Input() ProvinceLabel?: string = "";
  Contact: FormGroup;
  HeadingInfo: string = "Report";
  ContactInfoWithBinding:QuestionBase<any>[];
  Race:Options[];
  Sex:Options[];
  MaritalStatus:Options[];
  
  ActiveTrainers =[];

  constructor(private Ewep: EwepserverService,
              private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService) {
              this.CountryID = this.Ewep.SelectedCountryID;
              this.Race = this.Ewep.Race;
              this.Sex = this.Ewep.Sex;
              this.MaritalStatus = this.Ewep.MaritalStatus;
              this.EducationLevel = this.Ewep.EducationLevel;
              this.ActiveTrainers = this.Ewep.ActiveTrainers;
              this.ActiveEDFs = this.Ewep.ActiveEDFs;
              this.Age = this.Ewep.Age;
              this.NoOfChildren = this.Ewep.NoOfChildren;
              this.NoOfPeopleHousehold = this.Ewep.NoofPeopleHousehold;
              this.NoOfPeopleSupported = this.Ewep.NoOfPeopleSupported;
    if (this.CountryID == 1){
        this.Provinces = this.Ewep.province;
    }
    else{
    this.Provinces = this.Ewep.districtMetro;
    }
  //this.EducationLevel = this.Ewep.EducationLevel;  
  console.log("the country is: ", this.CountryID);
    Ewep.getActiveEDF().subscribe((efflist: any) => {
      this.ActiveEDFs = efflist.records;
    });
  }

  ngOnInit() {

    if (this.Heading === "") {
      this.Heading = this.HeadingInfo;
    }
    if (this.CountryID == 1){
      this.ProvinceLabel = "Province";
    }
    else{
      this.ProvinceLabel = "Region";
    }

    this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding(-1);
    this.Contact = this.cutomerFormHlper.toFormGroup(this.ContactInfoWithBinding);
  }
  searchClickint() {
    
    if (this.search.Province == "Select") {
      this.search.DistrictMetro = "Select";
      this.search.Municipality = "Select";
    }
    
    if (this.search.DistrictMetro == "Select") {
      this.search.Municipality = "Select";
      
    }
    this.SearchClick.emit(this.search);
     
    console.log('Race is ', this.search.Race);
    console.log('Sex is ', this.search.Sex);
    console.log('Age is ', this.search.Age);
    console.log('Children is ', this.search.NoOfChildren);
    console.log('Peops Household is ', this.search.NoOfPeopleHousehold);
    console.log('Peops Supported is ', this.search.NoOfPeopleSupported);
    console.log('Education Level is ', this.search.EducationLevel);
    console.log('Marital Status is ', this.search.MaritalStatus);
    console.log('Trainer is ', this.search.Trainer);
    console.log('Municipality is ', this.search.Municipality);
    console.log('District is ', this.search.DistrictMetro);
  }

  contaceDetailChange(event, Index) {
    console.log(event, Index);
    let d = <DropdownQuestion>this.ContactInfoWithBinding[Index];
    let d1 = null;
    switch (d.key) {
      case "Province_ID":
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.Ewep.districtMetro.filter((element) => {
          return element.Province_ID == event.value;
        }).map((value) => new Options(value.DistrictMetro_ID, value.Name))
        break;
      case "District_Metro_ID":
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.Ewep.localMunicipality.filter((element) => {
          return element.DistrictMetro_ID == event.value;
        }).map((value) => new Options(value.LocalMunicipality_ID, value.Name))
        break;
      case "Municipality_ID": 
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.Ewep.mainPlaces.filter((element) => {
          return element.LocalMunicipality_ID == event.value
        }).map((value) => new Options(value.MainPlace_ID, value.Name))
        break;
    }

  }

}
