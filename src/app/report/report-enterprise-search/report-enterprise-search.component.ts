import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EwepserverService } from '../../ewepserver.service';
import { Options, QuestionBase,DropdownQuestion} from '../../service/question';
import { CustomformSetupService } from '../../service/customform-setup.service';
import { CustomFromHelperControlService,forceValidate } from '../../service/custom-from-helper-control.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-enterprise-search',
  templateUrl: './report-enterprise-search.component.html',
  styleUrls: ['./report-enterprise-search.component.css']
})
export class ReportEnterpriseSearchComponent implements OnInit {

  search = { Province: "Select", DistrictMetro: "Select", Municipality: "Select", Sector: "", SubSector: "", LegalStructure: "Select", YearsOperating: "Select", Wages: "Select", Income: "Select", Sex: "Select", Age: "Select", Trainer: "Select" };
  Provinces = [];
  DistrictMetros = [];
  Municipalities = [];
  Sectors = [];
  CountryID;
  ActiveEDFs = [];
  Age= [];
  SubSectors=[];
  LegalStructure=[];
  YearsOperating=[];
  @Output() SearchClick = new EventEmitter<any>();
  @Output() filter:string ="";
  @Input() Heading?: string = "";
  @Input() ProvinceLabel?: string = "";
  Contact: FormGroup;
  SectorsForm: FormGroup;
  HeadingInfo: string = "Report";
  ContactInfoWithBinding:DropdownQuestion[];
  SectorInfoWithBinding:DropdownQuestion[];
  Wages:Options[];
  Sex:Options[];
  Income:Options[];
  
  ActiveTrainers =[];

  constructor(private Ewep: EwepserverService,
              private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService) {
              this.CountryID = this.Ewep.SelectedCountryID;
              this.Wages = this.Ewep.Wages;
              this.Sex = this.Ewep.Sex;
              this.Income = this.Ewep.Income;
              //this.Sectors = this.Ewep.Sectors;
              this.ActiveTrainers = this.Ewep.ActiveTrainers;
              this.ActiveEDFs = this.Ewep.ActiveEDFs;
              this.Age = this.Ewep.Age;
              //this.SubSectors = this.Ewep.SubSectors;
              this.LegalStructure = this.Ewep.LegalStructure;
              this.YearsOperating = this.Ewep.YearsOperating;
    if (this.CountryID == 1){
        this.Provinces = this.Ewep.province;
    }
    else{
    this.Provinces = this.Ewep.districtMetro;
    }
    this.Sectors = this.Ewep.sectors;
    this.SubSectors = this.Ewep.subSectors;

    console.log("in report Sectors are: ", this.Sectors);
    console.log("in report SubSectors are: ", this.SubSectors);
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

    this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding2(-1);
    this.Contact = this.cutomerFormHlper.toFormGroup(this.ContactInfoWithBinding);

    this.SectorInfoWithBinding = this.controlsService.getSectorInfoBinding2(0);
    this.SectorsForm = this.cutomerFormHlper.toFormGroup(this.SectorInfoWithBinding);
  }
  searchClickint() {
    if (this.search.Province == "Select") {
      this.search.DistrictMetro = "Select";
      this.search.Municipality = "Select";
    }
    
    if (this.search.DistrictMetro == "Select") {
      this.search.Municipality = "Select";
      
    }
    
    if (this.search.Sector == "Select") {
      this.search.SubSector = "Select";
      
    } 

    this.SearchClick.emit(this.search);
    
    console.log('Sector is ', this.search.Sector);
    console.log('Sex is ', this.search.Sex);
    console.log('Age is ', this.search.Age);
    console.log('Subsector is ', this.search.SubSector);
    console.log('Legal ', this.search.LegalStructure);
    console.log('Wages is ', this.search.Wages);
    console.log('Income is ', this.search.Income);
    console.log('Years operating is ', this.search.YearsOperating);
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

  sectorDetailChange(event, Index) {
    console.log(event, Index);
    let d = <DropdownQuestion>this.SectorInfoWithBinding[Index];
    let d1 = null;
    switch (d.key) {
      case "Sector_ID":
        d1 = <DropdownQuestion>this.SectorInfoWithBinding[Index + 1];
        d1.options = this.Ewep.subSectors.filter((element) => {
          return element.Sectors_ID == event.value;
        }).map((value) => new Options(value.SubSector_ID, value.Name))
        break;
      case "District_Metro_ID":
        d1 = <DropdownQuestion>this.ContactInfoWithBinding[Index + 1];
        d1.options = this.Ewep.localMunicipality.filter((element) => {
          return element.DistrictMetro_ID == event.value;
        }).map((value) => new Options(value.LocalMunicipality_ID, value.Name))
        break; 
      
    }

  }

}
