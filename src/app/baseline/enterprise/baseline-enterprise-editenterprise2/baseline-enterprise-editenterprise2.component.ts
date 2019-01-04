import { ChangeDetectorRef, Component, OnInit, OnChanges, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EwepserverService } from '../../../ewepserver.service'
import { QuestionBase } from '../../../service/question-base';
import { DropdownQuestion } from '../../../service/question-dropdown';
import { CustomFromHelperControlService, forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import { Options } from '../../../service/question-helper';
import { TextboxQuestion, NumbersQuestion } from '../../../service/question';
// /import { ValueTransformer } from '../../../../../node_modules/@angular/compiler/src/util';
import { MatDialog } from '@angular/material';
import { ListEntrepreneurComponent } from '../../../common/entrepreneur/list-entrepreneur/list-entrepreneur.component'

@Component({
  selector: 'app-baseline-enterprise-editenterprise2',
  templateUrl: './baseline-enterprise-editenterprise2.component.html',
  styleUrls: ['./baseline-enterprise-editenterprise2.component.css']
})
export class BaselineEnterpriseEditenterprise2Component implements OnInit {
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


  enterprise: any = {};
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
    finance_ID: 0, enterprise_ID: 0, Where_Apply: "",
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
     public EwepserverService: EwepserverService, private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService: CustomformSetupService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog) {


  }
  ngOnChanges(changes: any) {
    //this.enterprise = this.EwepserverService.getRoutingStashBox();
    //this.enterprise.Avg_Profit.value = 1000;  
    this.enterprise.Avg_Profit = this.enterprise.Avg_Sales + this.enterprise.Avg_Other_Income - (this.enterprise.Avg_Expenditure  + this.enterprise.Member_Salaries + this.enterprise.Employee_Salaries);
  }
  ngOnInit() {
    //get from stash box
    this.enterprise = this.EwepserverService.getRoutingStashBox();
    if (this.enterprise == null) {
      this.router.navigateByUrl("baseline/enterprise");
      return;
    } else {
      this.OnDataOK();
    }

    this.activatedRoute.params
      // NOTE: I do not use switchMap here, but subscribe directly
      .subscribe((params: Params) => {
        console.log(params.Enterprise_ID);
        if (params.Enterprise_ID) {

          if (params.Enterprise_ID > 0) {

            //this.OnDataOK();
            //side load the other data
            this.EwepserverService.getViewData("enterprise_member_view", 
                                              "filter=Enterprise_ID,eq," + params.Enterprise_ID)
                                              .subscribe((member) => {
              this.EntrepreneursList = member.records;
            });
            this.EwepserverService.getTableData("finance", "filter=Enterprise_ID,eq," + params.Enterprise_ID).subscribe((finance: any) => {
              this.FinanceLoans = finance.records;
            });
          } else {
            //Add New 
            console.log("Add new");
            this.enterprise = { Enterprise_ID: -1, Enterprise_Name: "" };
            this.OnDataOK();
            console.log("Should be done");
          }
        }
      });



  }
  OnDataOK() {

    this.user = new FormGroup({
      //General:this.General,
      //Details:this.Details,

      Enterprise_ID: new FormControl(this.enterprise.Enterprise_ID),
      Enterprise_Name: new FormControl(this.enterprise.Enterprise_Name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ])
    },

      [forceValidate("Finance.Funds_Other", [{ name: "Finance.Funds_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Finance.Assets_Other", [{ name: "Finance.Assets_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Finance.Avg_Sales > 0", [{ name: "Finance.Avg_Profit_Saved", UseLengthValidation: true, min: 1, max: 50, }]),
      forceValidate("Details.Sec_Other", [{ name: "Details.Sec_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Details.Agri_Other", [{ name: "Details.Agri_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Details.Manu_Other", [{ name: "Details.Manu_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Details.Retail_Other", [{ name: "Details.Retail_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Details.Mine_Other", [{ name: "Details.Mine_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Details.Arts_Other", [{ name: "Details.Arts_Specify", UseLengthValidation: true, min: 1, max: 50 }]),
      forceValidate("Details.GS_Other", [{ name: "Details.GS_Specify", UseLengthValidation: true, min: 1, max: 50 }])
      ]);

     
    this.GeneralQuestions = this.controlsService.getEnterpriseGenralForm(this.enterprise);

    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);

    this.EmployeesFemaleQuestions = this.controlsService.getEnterpriseEmploeesFormFemale(this.enterprise);
    this.EmployeesMaleQuestions = this.controlsService.getEnterpriseEmploeesFormMale(this.enterprise);
    this.EmployeesFemalePayQuestions = this.controlsService.getEnterpriseEmploeesFormFeMalePay(this.enterprise);
    this.EmployeesMalePayQuestions = this.controlsService.getEnterpriseEmploeesFormMalePay(this.enterprise);
    this.EmployeesQuestions = this.controlsService.getEnterpriseEmploeesFormAge(this.enterprise);
    this.Funds = this.controlsService.getStatUpFunds(this.enterprise);

    this.AccessToMarket = this.controlsService.getAccessToMarket(this.enterprise);
    this.AccessToTechnicalSkills = this.controlsService.getAccessToTechnicalSkills(this.enterprise);
    this.GoodsAndService = this.controlsService.getGoodsAndService(this.enterprise);
    this.ContactInfo = this.controlsService.getContactInfoNonBinding(this.enterprise);
    this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding(this.enterprise);

    this.Employees = this.cutomerFormHlper.toFormGroup(this.EmployeesFemaleQuestions,
                                                      this.EmployeesQuestions,
                                                      this.EmployeesMaleQuestions,
                                                      this.EmployeesFemalePayQuestions,
                                                      this.EmployeesMalePayQuestions);
    this.Finance = this.cutomerFormHlper.toFormGroup(this.Funds, this.AccessToMarket, this.AccessToTechnicalSkills);

    this.Details = this.cutomerFormHlper.toFormGroup(this.GoodsAndService, this.ContactInfo, this.ContactInfoWithBinding);

    this.user.addControl("General", this.General);
    this.user.addControl("Employees", this.Employees);
    this.user.addControl("Finance", this.Finance);
    this.user.addControl("Details", this.Details);
    this.showloading = false;

    this.SetOnChangeForFunds();
  }

  SetOnChangeForFunds() {
    this.Finance.get('Avg_Other_Income').valueChanges.subscribe(val => {
      this.FundsNumberChange(val);
    });
    this.Finance.get('Avg_Expenditure').valueChanges.subscribe(val => {
      this.FundsNumberChange(val);
    });
     
    this.Finance.get('Member_Salaries').valueChanges.subscribe(val => {
      this.FundsNumberChange(val);
    });
    this.Finance.get('Employee_Salaries').valueChanges.subscribe(val => {
      this.FundsNumberChange(val);
    });
  }
  falter() {
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
  }
  Delete(){
    this.cutomerFormHlper.showConfirmDelete(this.enterprise.Enterprise_Name ).subscribe(result=>{
      if(result.Result==='Ok'){
        this.EwepserverService.deleteEnterprise(this.enterprise.Enterprise_ID).subscribe((message:any)=>{
          if(message.OK==="OK"){
            alert("Enterprise deleted");             
          }else{
            alert("Error " + message.message);             
          }
          this.router.navigateByUrl('baseline/enterprise');
        });
      }
    });

  }
  CanSave(){
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    this.FlatMe["Country_ID"] = this.EwepserverService.SelectedCountryID;
    //Fix Date from the Material Control

    if (this.enterprise.Enterprise_ID === -1) {
      delete this.FlatMe.Enterprise_ID
      this.EwepserverService.CreateTableData("enterprise", this.FlatMe).subscribe((out) => {
        //Show Saving
        console.log("Create Done", out);
        this.enterprise.Enterprise_ID = out;
        //if (out === 1) {
        this.FinanceLoans.forEach((value) => {
          delete value.finance_ID;
          value.Enterprise_ID = this.enterprise.Enterprise_ID;
        });
        //delete all finance stuff and create a new one
        this.EwepserverService.deleteAllFinance(this.enterprise.Enterprise_ID, "").subscribe((out) => {
          //Add New suff
          this.EwepserverService.CreateTableData("finance", this.FinanceLoans).subscribe((outFin) => {
            console.log("Save Done to fin ", outFin);
            console.log(typeof (outFin));
            //this.router.navigateByUrl('baseline/enterprise');
          });
        });
        let newMember = []; 
        this.EntrepreneursList.forEach((value) => { 
          let n = {
            Enterprise_ID: this.enterprise.Enterprise_ID,
            Entrepreneur_ID: value.Entrepreneur_ID,
            Contact_Person: '1'
          };
          newMember.push(n);
        });
        if(newMember.length>0){
          this.EwepserverService.CreateTableData("enterprise_member", newMember).subscribe((outFin) => {
            console.log("Save Done to Members ", outFin);
            console.log(typeof (outFin));
            this.router.navigateByUrl('baseline/enterprise');
          });
        }else{
          this.router.navigateByUrl('baseline/enterprise');          
        }
      });
    } else {
      this.EwepserverService.updateTableData("enterprise", this.enterprise.Enterprise_ID, this.FlatMe).subscribe((out) => {
        //Show Saving
        console.log("Save Done", out);
        console.log(typeof (out));
        if (out === 1) {

          this.FinanceLoans.forEach((value) => {
            delete value.finance_ID;
            value.Enterprise_ID = this.enterprise.Enterprise_ID;
          });
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.enterprise.Enterprise_ID, "").subscribe((out) => {
            //Add New suff
            this.EwepserverService.CreateTableData("finance", this.FinanceLoans).subscribe((outFin) => {
              console.log("Save Done to fin ", outFin);
              console.log(typeof (outFin));
              this.router.navigateByUrl('baseline/enterprise');
            });
          });
          //this.router.navigateByUrl('/enterprise');
        }
        //this.showloading = false;
        //Move back to list screen

      });
    }
  }
  Save() {

    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    this.EwepserverService.checkEnterprise(this.FlatMe["Registration_Number"],this.enterprise.Enterprise_ID).subscribe((message:any)=>{
       
      if(message.records.length>0){        
        alert("Duplicate Registration Number" );
      }else{
        this.CanSave();
      }
    });


    
    //this.showloading = true;

  }
  addnewFinance(NewFinance) {
    delete NewFinance.finance_ID;
    NewFinance.enterprise_ID = this.enterprise.Enterprise_ID;
    this.FinanceLoans.push(NewFinance);
    //this.FinanceLoans2 = [...this.FinanceLoans];
    this.newFinanceLoan = {
      finance_ID: 0, enterprise_ID: this.enterprise.Enterprise_ID, Where_Apply: "",
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
    //this.showEntrepreneursList = false;
    //this.EntrepreneurEditItem = { Name: "", Surname: "" };
    const dialogRef = this.dialog.open(ListEntrepreneurComponent, {

      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.Resulet === 'Save') {
        console.log("AddNewEntrepreneur",result.data);
        if(this.enterprise.Enterprise_ID==-1){
          let n = {
            Name:result.data.Name,
            Surname:result.data.Surname,
            Sex:result.data.Sex,
            Race:result.data.Race,
            City:result.data.City,
            Enterprise_ID:this.enterprise.Enterprise_ID,
            Enterprise_Name:"",
            Enterprise_Member_ID:-1,
            Contact_Person:"Contact_Person",
            Entrepreneur_ID:result.data.Entrepreneur_ID
          }
          this.EntrepreneursList.push(n);
        }else{
          this.showloading_Entrepreneurs = true;
          let n = {
            Enterprise_ID: this.enterprise.Enterprise_ID,
            Entrepreneur_ID: result.data.Entrepreneur_ID,
            Contact_Person: '1'
          };
          
          this.EwepserverService.CreateTableData("enterprise_member", n).subscribe((outFin) => {
            //Load members again
            this.EwepserverService.getViewData("enterprise_member_view", "filter=Enterprise_ID,eq," + this.enterprise.Enterprise_ID).subscribe((member) => {
              this.EntrepreneursList = member.records;
              this.showloading_Entrepreneurs = false;
            });
          });
        }
      }
    });
  }
  onSelectEntrepreneur(rowSelected) {
    console.log(rowSelected);
  }
  onEditEntrepreneur(RowEdit) {
    console.log(RowEdit);
    //console.log(RowEdit);
    //Go to Entropanure edit Show in view
    this.router.navigateByUrl("baseline/entrepreneur/" + RowEdit.Entrepreneur_ID);
  }
  onDeleteEntrepreneur(RowDelete) {
    this.showloading_Entrepreneurs = true;
    //Find Entopuner ID and remove from 
    console.log("Delete Click", RowDelete.Enterprise_ID, RowDelete);
    if (RowDelete.Enterprise_Member_ID == -1) {
      this.EntrepreneursList = this.EntrepreneursList.filter(x => x.Entrepreneur_ID != RowDelete.Entrepreneur_ID);
      // console.log("Next found", index);
      // this.EntrepreneursList.slice(index, 1);
      this.showloading_Entrepreneurs = false;
    } else {
      let OldValue = this.EntrepreneursList.find(x => x.Enterprise_Member_ID == RowDelete.Enterprise_Member_ID);
      this.EwepserverService.deleteTableData("enterprise_member", OldValue.Enterprise_Member_ID).subscribe((outFin) => {
        //Load members again
        this.EwepserverService.getViewData("enterprise_member_view", "filter=Enterprise_ID,eq," + this.enterprise.Enterprise_ID).subscribe((member) => {
          this.EntrepreneursList = member.records;
          this.showloading_Entrepreneurs = false;
        });
      });

    }

  }
  FundsNumberChange(Value) {
    console.log("Input Value", Value);
    let Calc = ((Number(this.Finance.get("Avg_Sales").value)) + (Number(this.Finance.get("Avg_Other_Income").value))) -
      ((Number(this.Finance.get("Avg_Expenditure").value)  +
        Number(this.Finance.get("Member_Salaries").value) + Number(this.Finance.get("Employee_Salaries").value)));
    this.Finance.get("Avg_Profit").setValue(Number(Calc)); 
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
  finance_ID: number,
  Enterprise_ID?: number,
  enterprise_ID: number
  Where_Apply: string
  Approved: boolean
  Reject_Reason: string
  How_Much: number
  Started_Repay: boolean,
  Amount_Issued: number,
  Repay_Amount: number
}