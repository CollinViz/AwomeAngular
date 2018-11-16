import { ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EwepserverService } from '../../../ewepserver.service'
import { QuestionBase } from '../../../service/question-base';
import { DropdownQuestion } from '../../../service/question-dropdown';
import { CustomFromHelperControlService, forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import { Options } from '../../../service/question-helper';
import {FormGroupBaselineCoopEditcoop2} from './baseline-coop-editcoop2'
// /import { ValueTransformer } from '../../../../../node_modules/@angular/compiler/src/util';


@Component({
  selector: 'app-baseline-coop-editcoop2',
  templateUrl: './baseline-coop-editcoop2.component.html',
  styleUrls: ['./baseline-coop-editcoop2.component.css']
})
export class BaselineCoopEditcoop2Component implements OnInit {
  GeneralQuestions: QuestionBase<any>[]
  EmployeesQuestions: QuestionBase<any>[]
  EmployeesFemaleQuestions: QuestionBase<any>[]
  EmployeesMaleQuestions: QuestionBase<any>[]
  EmployeesFemalePayQuestions: QuestionBase<any>[]
  EmployeesMalePayQuestions: QuestionBase<any>[]
  Funds: QuestionBase<any>[];
  AccessToMarket: QuestionBase<any>[];
  AccessToTechnicalSkills: QuestionBase<any>[];
  GoodsAndService: QuestionBase<any>[];
  ContactInfo: QuestionBase<any>[];
  ContactInfoWithBinding: QuestionBase<any>[];


  cooperative: any = {};
  EntrepreneursList: any[] = [];
  EntrepreneurEditItem: any = {};
  Defaultselected: any = {};
  FlatMe: any = {};
  showEntrepreneursList: boolean = true;

  showloading: boolean = true;
  showloading_Entrepreneurs: boolean = false;
  FinanceLoans: any[] = [];
  FinanceLoans2: any[] = [];

  newFinanceLoan: finance = {
    cooperative_finance_ID: 0, Cooperative_ID: 0, Where_Apply: "",
    Approved: false, Reject_Reason: "", Started_Repay: false,
    How_Much: 0.00, Amount_Issued: 0.00, Repay_Amount: 0.00
  };
  //Form Group stuff
  user: FormGroup;
  General: FormGroup;
  Employees: FormGroup;
  Finance: FormGroup;
  Details: FormGroup;


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private EwepserverService: EwepserverService, private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService: CustomformSetupService,
    private _cdr: ChangeDetectorRef) {


  }
  ngOnInit() {
    this.cooperative = this.EwepserverService.getRoutingStashBox();
    if (this.cooperative == null) {
      this.router.navigateByUrl("baseline/cooperative");
      return;
    } else {
      this.OnDataOK();
    }

    this.activatedRoute.params
      // NOTE: I do not use switchMap here, but subscribe directly
      .subscribe((params: Params) => {
        console.log(params.Cooperative_ID);
        if (params.Cooperative_ID) {
          if (params.Cooperative_ID > 0) {
            // this.EwepserverService.getCooperativeItem(params.Cooperative_ID).subscribe((customers:any)=>{
            //console.log(customers);
            //this.cooperative = customers; 
            this.EwepserverService.getViewData("cooperative_member_view", "filter=Cooperative_ID,eq," + params.Cooperative_ID).subscribe((member) => {
              this.EntrepreneursList = member.records;
            });
            this.EwepserverService.getTableData("cooperative_finance", "filter=Cooperative_ID,eq," + params.Cooperative_ID).subscribe((finance: any) => {
              this.FinanceLoans = finance.records;
              this.OnDataOK();
            });

            //});
          } else {
            //Add New 
            console.log("Add new");
            this.cooperative = { Cooperative_ID: -1, Cooperative_Name: "" };
            this.OnDataOK();
            console.log("Should be done");
          }
        }
      });



  }
  OnDataOK() {

    this.user = new FormGroup({
      Cooperative_ID: new FormControl(this.cooperative.Cooperative_ID),
      Cooperative_Name: new FormControl(this.cooperative.Cooperative_Name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ])
    });
    let oFromTemp:FormGroupBaselineCoopEditcoop2 = new FormGroupBaselineCoopEditcoop2(this.EwepserverService); 
    this.GeneralQuestions = oFromTemp.getEnterpriseGenralForm(this.cooperative);//this.controlsService.getEnterpriseGenralForm(this.cooperative);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);

    this.EmployeesFemaleQuestions = this.controlsService.getEnterpriseEmploeesFormFemale(this.cooperative);
    this.EmployeesMaleQuestions = this.controlsService.getEnterpriseEmploeesFormMale(this.cooperative);
    this.EmployeesFemalePayQuestions = this.controlsService.getEnterpriseEmploeesFormFeMalePay(this.cooperative);
    this.EmployeesMalePayQuestions = this.controlsService.getEnterpriseEmploeesFormMalePay(this.cooperative);
    this.EmployeesQuestions = this.controlsService.getEnterpriseEmploeesFormAge(this.cooperative);
    this.Funds = this.controlsService.getStatUpFunds(this.cooperative);
    this.AccessToMarket = this.controlsService.getAccessToMarket(this.cooperative);
    this.AccessToTechnicalSkills = this.controlsService.getAccessToTechnicalSkills(this.cooperative);
    this.GoodsAndService = this.controlsService.getGoodsAndService(this.cooperative);
    this.ContactInfo = this.controlsService.getContactInfoNonBinding(this.cooperative);
    this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding(this.cooperative);

    this.Employees = this.cutomerFormHlper.toFormGroup(this.EmployeesFemaleQuestions, this.EmployeesQuestions, this.EmployeesMaleQuestions, this.EmployeesFemalePayQuestions, this.EmployeesMalePayQuestions);
    this.Finance = this.cutomerFormHlper.toFormGroup(this.Funds, this.AccessToMarket, this.AccessToTechnicalSkills);
    //this.Finance.setValidators([forceValidate("Training_Qtr",[{name:"What_Training"},{name:"Who_Traininig",min:4,max:25},
    // //  {name:"When_Training",min:4,max:25},
    // //  {name:"How_Know_Training" }])]);
    this.Details = this.cutomerFormHlper.toFormGroup(this.GoodsAndService, this.ContactInfo, this.ContactInfoWithBinding);

    this.user.addControl("General", this.General);
    this.user.addControl("Employees", this.Employees);
    this.user.addControl("Finance", this.Finance);
    this.user.addControl("Details", this.Details);
    this.showloading = false;
  }

  falter() {
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
  }
  Save() {
    //console.log("When_Training",this.Finance.get('When_Training').value);
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    //Fix Date from the Material Control
    //this.FlatMe.When_Training = this.cutomerFormHlper.getDateValue(this.Finance.get('When_Training').value);
    if (this.cooperative.Cooperative_ID === -1) {
      delete this.FlatMe.Cooperative_ID
      this.EwepserverService.CreateTableData("cooperative", this.FlatMe).subscribe((out) => {
        //Show Saving
        console.log("Create Done", out);
        this.cooperative.Cooperative_ID= out;
        //if (out === 1) {
          this.FinanceLoans.forEach((value) => {
            delete value.Cooperative_finance_ID;
            value.Cooperative_ID = this.cooperative.Cooperative_ID;
          });
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinanceCooperative(this.cooperative.Cooperative_ID, "").subscribe((out) => {
            //Add New suff
            this.EwepserverService.CreateTableData("cooperative_finance", this.FinanceLoans).subscribe((outFin) => {
              console.log("Save Done to fin ", outFin);
              console.log(typeof (outFin));
              this.router.navigateByUrl('baseline/cooperative');
            });
          });
          //this.router.navigateByUrl('/cooperative');
        //}

        //this.showloading = false;
        //Move back to list screen

      });
    } else {
      this.EwepserverService.updateTableData("cooperative", this.cooperative.Cooperative_ID, this.FlatMe).subscribe((out) => {
        //Show Saving
        console.log("Save Done", out);
        console.log(typeof (out));
        //this.cooperative.Cooperative_ID = out;
        if(out===1){

        this.FinanceLoans.forEach((value) => {
          delete value.Cooperative_finance_ID;
          value.Cooperative_ID = this.cooperative.Cooperative_ID;
        });
        //delete all finance stuff and create a new one
        this.EwepserverService.deleteAllFinanceCooperative(this.cooperative.Cooperative_ID, "").subscribe((out) => {
          //Add New suff
          this.EwepserverService.CreateTableData("cooperative_finance", this.FinanceLoans).subscribe((outFin) => {
            console.log("Save Done to fin ", outFin);
            console.log(typeof (outFin));
            this.router.navigateByUrl('baseline/cooperative');
          });
        });
        //this.router.navigateByUrl('/cooperative');
        }
        //this.showloading = false;
        //Move back to list screen

      });
    }
    //this.showloading = true;

  }
  addnewFinance(NewFinance) {
    delete NewFinance.cooperative_finance_ID;
    NewFinance.cooperative_ID = this.cooperative.Cooperative_ID;
    this.FinanceLoans.push(NewFinance);
    //this.FinanceLoans2 = [...this.FinanceLoans];
    this.newFinanceLoan = {
      cooperative_finance_ID: 0, Cooperative_ID: this.cooperative.Cooperative_ID, Where_Apply: "",
      Approved: false, Reject_Reason: "", Started_Repay: false,
      How_Much: 0.00, Amount_Issued: 0.00, Repay_Amount: 0.00
    };
  }
  financeRowClick(Index) {
    console.log(Index);
    console.log(this.FinanceLoans[Index]);
    this.newFinanceLoan = this.FinanceLoans[Index];
    this.FinanceLoans.splice(Index, 1);
  }
  AddNewEntrepreneur() {
    //show control for add Enter
    this.showEntrepreneursList = false;
    this.EntrepreneurEditItem = { Name: "", Surname: "" };
  }
  onSelectEntrepreneur(rowSelected) {
    console.log(rowSelected);
  }
  onEditEntrepreneur(RowEdit) {
    //console.log(RowEdit);
    this.showloading_Entrepreneurs = true;
    this.EwepserverService.getRowData("entrepreneur", RowEdit.Entrepreneur_ID).subscribe((entrepreneur) => {
      this.EntrepreneurEditItem = entrepreneur;
      this.showEntrepreneursList = false;
      this.showloading_Entrepreneurs = false;
    });

  }
  onSaveEntrepreneur(NewOrEditEntrepreneur: any) {
    this.showloading_Entrepreneurs = true;
    //Test if we need to create or edit
    if (NewOrEditEntrepreneur.Entrepreneur_ID == -1) {
      //create
      delete NewOrEditEntrepreneur.Entrepreneur_ID;
      this.EwepserverService.CreateTableData("entrepreneur", NewOrEditEntrepreneur).subscribe((newID) => {
        //Add user to Cooperative 
        let newEntrepreneur = {
          Entrepreneur_ID: newID, Name: NewOrEditEntrepreneur.Name, Surname: NewOrEditEntrepreneur.Surname,
          Cooperative_ID: this.cooperative.Cooperative_ID
        };
        this.EntrepreneursList.push(newEntrepreneur);
        this.showloading_Entrepreneurs = false;
        this.showEntrepreneursList = true;
      });
    } else {
      //update
      this.EwepserverService.updateTableData("entrepreneur", NewOrEditEntrepreneur.Entrepreneur_ID, NewOrEditEntrepreneur).subscribe((Data) => {
        //Find ID and update 
        const OldValue = this.EntrepreneursList.find(x => x.Entrepreneur_ID == NewOrEditEntrepreneur.Entrepreneur_ID);
        OldValue.Name = NewOrEditEntrepreneur.Name;
        OldValue.Surname = NewOrEditEntrepreneur.Surname;
        this.showloading_Entrepreneurs = false;
        this.showEntrepreneursList = true;
      })
    }
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


interface finance {
  cooperative_finance_ID: number,
  Cooperative_ID?: number 
  Where_Apply: string
  Approved: boolean
  Reject_Reason: string
  How_Much: number
  Started_Repay: boolean,
  Amount_Issued: number,
  Repay_Amount: number
}