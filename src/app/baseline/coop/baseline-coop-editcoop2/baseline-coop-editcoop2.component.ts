import { ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EwepserverService } from '../../../ewepserver.service';
import { QuestionBase } from '../../../service/question-base';
import { DropdownQuestion } from '../../../service/question-dropdown';
import { CustomFromHelperControlService, forceValidate } from '../../../service/custom-from-helper-control.service';
import { CustomformSetupService } from '../../../service/customform-setup.service';
import { Options } from '../../../service/question-helper';
import { FormGroupBaselineCoopEditcoop2 } from './baseline-coop-editcoop2';
// /import { ValueTransformer } from '../../../../../node_modules/@angular/compiler/src/util';
import { MatDialog } from '@angular/material';
import { ListEntrepreneurComponent } from '../../../common/entrepreneur/list-entrepreneur/list-entrepreneur.component';

@Component({
  selector: 'app-baseline-coop-editcoop2',
  templateUrl: './baseline-coop-editcoop2.component.html',
  styleUrls: ['./baseline-coop-editcoop2.component.css']
})
export class BaselineCoopEditcoop2Component implements OnInit {
  GeneralQuestions: QuestionBase<any>[];
  EmployeesQuestions: QuestionBase<any>[];
  EmployeesFemaleQuestions: QuestionBase<any>[];
  EmployeesMaleQuestions: QuestionBase<any>[];
  EmployeesFemalePayQuestions: QuestionBase<any>[];
  EmployeesMalePayQuestions: QuestionBase<any>[];
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
     public EwepserverService: EwepserverService, private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService: CustomformSetupService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private formHelper: CustomFromHelperControlService) {


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
            this.EwepserverService.getViewData("cooperative_member_view",
              "filter=Cooperative_ID,eq," + params.Cooperative_ID)
              .subscribe((member) => {
                this.EntrepreneursList = member.records;
              });
            this.EwepserverService.getTableData("cooperative_finance",
              "filter=Cooperative_ID,eq," + params.Cooperative_ID)
              .subscribe((finance: any) => {
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
    let oFromTemp: FormGroupBaselineCoopEditcoop2 = new FormGroupBaselineCoopEditcoop2(this.EwepserverService);
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
    this.SetOnChangeForFunds();
  }

  falter() {
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
  }
  Delete(){
    this.cutomerFormHlper.showConfirmDelete(this.cooperative.Cooperative_Name ).subscribe(result=>{
      if(result.Result==='Ok'){
        this.EwepserverService.deleteCooperative(this.cooperative.Cooperative_ID).subscribe((message:any)=>{
          if(message.OK==="OK"){
            alert("Cooperative deleted");             
          }else{
            alert("Error " + message.message);             
          }
          this.router.navigateByUrl('baseline/cooperative');
        });
      }
    });

  }
  Save() { 
    //console.log("When_Training",this.Finance.get('When_Training').value);
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value); 
 
    this.EwepserverService.checkCooperative(this.FlatMe["Registration_Number"],this.cooperative.Cooperative_ID).subscribe((message:any)=>{
       
      if(message.records.length>0){        
        alert("Duplicate Registration Number" );
      }else{
        this.CanSave();
      }
    });
    
    //this.showloading = true;

  }
  CanSave(){
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    this.FlatMe["Country_ID"] = this.EwepserverService.SelectedCountryID;
    //Fix Date from the Material Control
    //this.FlatMe.When_Training = this.cutomerFormHlper.getDateValue(this.Finance.get('When_Training').value);
    if (this.cooperative.Cooperative_ID === -1) {
      delete this.FlatMe.Cooperative_ID
      this.EwepserverService.CreateTableData("cooperative", this.FlatMe).subscribe((out) => {
        //Show Saving
        console.log("Create Done", out);
        this.cooperative.Cooperative_ID = out;
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
            this.saveMembers();
          });
        });
        

      });
    } else {
      this.EwepserverService.updateTableData("cooperative", this.cooperative.Cooperative_ID, this.FlatMe).subscribe((out) => {
        //Show Saving
        console.log("Save Done", out);
        console.log(typeof (out));
        //this.cooperative.Cooperative_ID = out;
        if (out === 1) {

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
              this.saveMembers();
            });
          });
          //this.router.navigateByUrl('/cooperative');
        }
        //this.showloading = false;
        //Move back to list screen

      });
    }
  }
  saveMembers() {
    //Find all new one
    let OldValue = this.EntrepreneursList.filter(x => x.Cooperative_ID == -1);
    let newItems = [];
    OldValue.forEach(value => {
      value.Cooperative_ID = this.cooperative.Cooperative_ID

      newItems.push({
        Cooperative_ID: this.cooperative.Cooperative_ID,
        Entrepreneur_ID: value.Entrepreneur_ID,
        Contact_Person: '1'
      });
    });

    if (OldValue.length > 0) {
      this.EwepserverService.CreateTableData("cooperative_member", newItems).subscribe((outFin) => {
        this.router.navigateByUrl('baseline/cooperative');
      });
    } else {
      this.router.navigateByUrl('baseline/cooperative');
    }
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
    //this.showEntrepreneursList = false;
    //this.EntrepreneurEditItem = { Name: "", Surname: "" };
    const dialogRef = this.dialog.open(ListEntrepreneurComponent, {

      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.Resulet === 'Save') {
        console.log("AddNewEntrepreneur",result.data);
        if(this.cooperative.Cooperative_ID==-1){
          let n = {
            Name:result.data.Name,
            Surname:result.data.Surname,
            Sex:result.data.Sex,
            Race:result.data.Race,
            City:result.data.City,
            Cooperative_ID:this.cooperative.Cooperative_ID,
            Cooperative_Name:"",
            Cooperative_Member_ID:-1,
            Contact_Person:"Contact_Person",
            Entrepreneur_ID:result.data.Entrepreneur_ID
          }
          this.EntrepreneursList.push(n);
        }else{
          this.showloading_Entrepreneurs = true;
          let n = {
            Cooperative_ID: this.cooperative.Cooperative_ID,
            Entrepreneur_ID: result.data.Entrepreneur_ID,
            Contact_Person: '1'
          };

          this.EwepserverService.CreateTableData("cooperative_member", n).subscribe((outFin) => {
            //Load members again
            this.EwepserverService.getViewData("cooperative_member_view", "filter=Cooperative_ID,eq," + this.cooperative.Cooperative_ID).subscribe((member) => {
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
    console.log("Delete Click", RowDelete.Cooperative_ID, RowDelete);
    if (RowDelete.Cooperative_ID == -1) {
      this.EntrepreneursList = this.EntrepreneursList.filter(x => x.Entrepreneur_ID != RowDelete.Entrepreneur_ID);
       
      this.showloading_Entrepreneurs = false;
    } else {
      let OldValue = this.EntrepreneursList.find(x => x.Cooperative_Member_ID == RowDelete.Cooperative_Member_ID);
      this.EwepserverService.deleteTableData("cooperative_member", OldValue.Cooperative_Member_ID).subscribe((outFin) => {
        //Load members again
        this.EwepserverService.getViewData("cooperative_member_view", "filter=Cooperative_ID,eq," + this.cooperative.Cooperative_ID).subscribe((member) => {
          this.EntrepreneursList = member.records;
          this.showloading_Entrepreneurs = false;
        });
      });

    }

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