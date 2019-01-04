import { Component, OnInit,EventEmitter ,Output, Input, OnChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { QuestionBase } from '../../../service/question-base';
import { DropdownQuestion } from '../../../service/question-dropdown'
import { TextboxQuestion } from '../../../service/question-textbox'
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import {FormGroupMapVisitsEnterprise} from '../form-group-map-visits-enterprise'
 
@Component({
  selector: 'app-editfrm-visits-enterprise-enterprise',
  templateUrl: './editfrm-visits-enterprise-enterprise.component.html',
  styles: []
})
export class EditfrmVisitsEnterpriseEnterpriseComponent implements OnInit,OnChanges {
  @Output() backButton = new EventEmitter<string>();
    @Input() enterprise_visit:any = {};

  GeneralQuestions:QuestionBase<any>[]
  EmployeesQuestions:QuestionBase<any>[]
  EmployeesFemaleQuestions:QuestionBase<any>[]
  EmployeesMaleQuestions:QuestionBase<any>[]
  EmployeesFemalePayQuestions:QuestionBase<any>[]
  EmployeesMalePayQuestions:QuestionBase<any>[]
  Funds:QuestionBase<any>[];
  AccessToMarket:QuestionBase<any>[];
  AccessToTechnicalSkills:QuestionBase<any>[];
  
  //Form Group stuff
  user: FormGroup;
  General:FormGroup;
  Employees:FormGroup;
  Finance: FormGroup;

  //enterprise_visit:any={};
  FlatMe:any={};
  showloading:boolean = true;
  FinanceLoans:any[] =[];
  FinanceLoans2:any[] =[];
  newFinanceLoan:finance={finance_ID:0,enterprise_visit_ID:0,enterprise_ID:0,Where_Apply:"new",
                          Approved:false,Reject_Reason:"",Reject_Specify:"",
                          How_Much:0.00,Started_Repay:false,Amount_Issued:0.00,Repay_Amount:0.00};
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
     public EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService:CustomformSetupService  ) { }
    // @Output() SelectClick = new EventEmitter<number>();
    ngOnChanges(changes: any){
      if(changes.enterprise_visit){
        if(!this.showloading){

          this.user.updateValueAndValidity(this.enterprise_visit);
          
        }
      }
    }
  ngOnInit() {
    this.showloading = true;
    console.log(this.enterprise_visit)
    this.OnDataOK();
  }
  
  OnDataOK(){ 
    this.user = new FormGroup({
      Enterprise_ID: new FormControl('1'),
      Enterprise_Name: new FormControl('BOB') 
    });
    let frmEditVisit = new FormGroupMapVisitsEnterprise(this.EwepserverService);
    this.GeneralQuestions  = frmEditVisit.getEnterpriseGenralForm(this.enterprise_visit);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);
    
    this.EmployeesFemaleQuestions = frmEditVisit.getEnterpriseEmploeesFormFemale(this.enterprise_visit);
    this.EmployeesMaleQuestions = frmEditVisit.getEnterpriseEmploeesFormMale(this.enterprise_visit);
    this.EmployeesFemalePayQuestions = frmEditVisit.getEnterpriseEmploeesFormFeMalePay(this.enterprise_visit);
    this.EmployeesMalePayQuestions = frmEditVisit.getEnterpriseEmploeesFormMalePay(this.enterprise_visit);
    this.EmployeesQuestions = frmEditVisit.getEnterpriseEmploeesFormAge(this.enterprise_visit);
    this.Funds = frmEditVisit.getStatUpFunds(this.enterprise_visit);
    this.AccessToMarket =frmEditVisit.getAccessToMarket(this.enterprise_visit); 
    this.AccessToTechnicalSkills = frmEditVisit.getAccessToTechnicalSkills(this.enterprise_visit); 
    
    
    
    this.Employees = this.cutomerFormHlper.toFormGroup(this.EmployeesFemaleQuestions,this.EmployeesQuestions,this.EmployeesMaleQuestions,this.EmployeesFemalePayQuestions,this.EmployeesMalePayQuestions);
    this.Finance = this.cutomerFormHlper.toFormGroup(this.Funds,this.AccessToMarket,this.AccessToTechnicalSkills);
    this.user.addControl("General",this.General);
    this.user.addControl("Employees",this.Employees);
    this.user.addControl("Finance",this.Finance);
    this.showloading = false;
    this.SetOnChangeForFunds();
  }
  Back(){
    this.backButton.emit("");
  }
  Save(){
     
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    //Fix Date from the Material Control
    this.FlatMe.Visit_Date = this.cutomerFormHlper.getDateValue(this.General.get('Visit_Date').value);
    this.FlatMe.When_Training = this.cutomerFormHlper.getDateValue(this.Finance.get('When_Training').value);
    //When_Training
    /*console.log("Visit_Date",this.Finance.get('Visit_Date').value);
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    //Fix Date from the Material Control
    this.FlatMe.Visit_Date = this.cutomerFormHlper.getDateValue(this.Finance.get('Visit_Date').value);*/
    this.FlatMe.Enterprise_ID = this.enterprise_visit.Enterprise_ID;
    if(this.enterprise_visit.Enterprise_Visit_ID===-1){
      delete this.FlatMe.Enterprise_Visit_ID
      this.FlatMe.Enterprise_ID = this.enterprise_visit.Enterprise_ID;
      this.EwepserverService.CreateTableData("enterprise_visits",this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Create Done",out);
        this.enterprise_visit.Enterprise_Visit_ID = out;
         
          this.FinanceLoans.forEach((value)=>{
            delete value.finance_ID; 
            value.Enterprise_Visit_ID=this.enterprise_visit.Enterprise_Visit_ID;
          });
          //Fix test if Finace as list else 
          
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.enterprise_visit.Enterprise_Visit_ID,"").subscribe((out)=>{
            //Add New suff
            if(this.FinanceLoans.length>0){
              this.EwepserverService.CreateTableData("finance",this.FinanceLoans).subscribe((outFin)=>{
                console.log("Save Done to fin ",outFin);
                console.log(typeof(outFin)); 
                this.backButton.emit("refresh");
              }); 
            }else{
              this.backButton.emit("refresh");
            }
            
          });
          //this.router.navigateByUrl('/enterprise');
       
         
        //this.showloading = false;
        //Move back to list screen
        
      });
    } else{
      this.EwepserverService.updateTableData("enterprise_visits",this.enterprise_visit.Enterprise_Visit_ID,this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Save Done",out);
        console.log(typeof(out));
        if(out===1){
           
          this.FinanceLoans.forEach((value)=>{
            delete value.finance_ID; 
            value.Enterprise_Visit_ID=this.enterprise_visit.Enterprise_Visit_ID;
          });
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.enterprise_visit.Enterprise_Visit_ID,"").subscribe((out)=>{
            //Add New suff
            this.EwepserverService.CreateTableData("finance",this.FinanceLoans).subscribe((outFin)=>{
              console.log("Save Done to fin ",outFin);
              console.log(typeof(outFin)); 
              this.backButton.emit("refresh");
              //this.router.navigateByUrl('/visits/enterprise/'+this.enterprise_visit.Enterprise_ID);
            }); 
          });
          //this.router.navigateByUrl('/enterprise');
        }
        //this.showloading = false;
        //Move back to list screen
        
      });
    }   
    //this.showloading = true;
   
  }
  addnewFinance(NewFinance){
    delete NewFinance.finance_ID;
    NewFinance.enterprise_visit_ID = this.enterprise_visit.Enterprise_Visit_ID;
    this.FinanceLoans.push(NewFinance);
    //this.FinanceLoans2 = [...this.FinanceLoans];
    this.newFinanceLoan = {finance_ID:0,enterprise_visit_ID:this.enterprise_visit.Enterprise_Visit_ID,enterprise_ID:this.enterprise_visit.Enterprise_ID, 
                            Where_Apply:"",Approved:false,Reject_Reason:"",Reject_Specify:"",How_Much:0.00,
                            Started_Repay:false,Amount_Issued:0.00,Repay_Amount:0.00};
  }
  financeRowClick(Index){
    console.log(Index);
    console.log(this.FinanceLoans[Index]);
    this.newFinanceLoan = this.FinanceLoans[Index];
    this.FinanceLoans.splice(Index,1);
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
}

interface finance {
  finance_ID:number 
  enterprise_visit_ID:number
  enterprise_ID:number 
  Where_Apply:string  
  Approved:boolean  
  Reject_Reason:string
  Reject_Specify:string 
  How_Much:number 
  Started_Repay:boolean
  Amount_Issued:number
  Repay_Amount:number
}
