import { Component, OnInit,EventEmitter ,Output,Input,OnChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { QuestionBase } from '../../../service/question-base';
import { DropdownQuestion } from '../../../service/question-dropdown'
import { TextboxQuestion } from '../../../service/question-textbox'
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import {FormGroupMapVisitsCooperative} from '../form-group-map-visits-cooperative'

@Component({
  selector: 'app-editfrm-visits-cooperative',
  templateUrl: './editfrm-visits-cooperative.component.html',
  styles: []
})
export class EditfrmVisitsCooperativeComponent implements OnInit,OnChanges {
  @Output() backButton = new EventEmitter<string>();
    @Input() cooperative_visit:any = {};

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

  //cooperative_visit:any={};
  FlatMe:any={};
  showloading:boolean = true;
  FinanceLoans:any[] =[];
  FinanceLoans2:any[] =[];
  newFinanceLoan:finance={finance_ID:0,cooperative_visit_ID:0,cooperative_ID:0,Where_Apply:"new",
                          Approved:false,Reject_Reason:"",Reject_Specify:"",
                          How_Much:0.00,Started_Repay:false,Amount_Issued:0.00,Repay_Amount:0.00};
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService:CustomformSetupService  ) { }
    // @Output() SelectClick = new EventEmitter<number>();
    ngOnChanges(changes: any){
      if(changes.cooperative_visit){
        if(!this.showloading){

          this.user.patchValue(this.cooperative_visit);
          
        }
      }
    }
  ngOnInit() {
    this.showloading = true;
//marshall
/*
this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Cooperative_ID);
      if(params.Cooperative_ID){
        if(params.Cooperative_ID>0){
          this.EwepserverService.getRowData("")
          this.EwepserverService.getCooperativeVisitItem(/*params.Cooperative_Visit_ID2).subscribe((customers:any)=>{
          //this.EwepserverService.getCooperativeVisitItem(params.Cooperative_Visit_ID).subscribe((customers:any)=>{  
           /* console.log(customers);
            this.cooperative_visit = customers; 
            this.OnDataOK();
            
            
          });
        }else{ 
          //Add New 
          console.log("Add new");
          this.cooperative_visit = {Cooperative_Visit_ID:-1,Cooperative_Name:""};
          this.OnDataOK();
          console.log("Should be done"); 
        }
      }
    });
*/
//marshall //



    this.OnDataOK();
  }
  OnDataOK(){ 
    this.user = new FormGroup({
      Cooperative_ID: new FormControl('1'),
      Cooperative_Name: new FormControl('BOB') 
    });
    let frmEditVisit = new FormGroupMapVisitsCooperative(this.EwepserverService);
    this.GeneralQuestions  = frmEditVisit.getCooperativeGeneralForm(this.cooperative_visit);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);
    
    this.EmployeesFemaleQuestions = frmEditVisit.getCooperativeEmployeesFormFemale(this.cooperative_visit);
    this.EmployeesMaleQuestions = frmEditVisit.getCooperativeEmployeesFormMale(this.cooperative_visit);
    this.EmployeesFemalePayQuestions = frmEditVisit.getCooperativeEmployeesFormFeMalePay(this.cooperative_visit);
    this.EmployeesMalePayQuestions = frmEditVisit.getCooperativeEmployeesFormMalePay(this.cooperative_visit);
    this.EmployeesQuestions = frmEditVisit.getCooperativeEmployeesFormAge(this.cooperative_visit);
    this.Funds = frmEditVisit.getStartUpFunds(this.cooperative_visit);
    this.AccessToMarket =frmEditVisit.getAccessToMarket(this.cooperative_visit); 
    this.AccessToTechnicalSkills = frmEditVisit.getAccessToTechnicalSkills(this.cooperative_visit); 
    
    
    
    this.Employees = this.cutomerFormHlper.toFormGroup(this.EmployeesFemaleQuestions,this.EmployeesQuestions,this.EmployeesMaleQuestions,this.EmployeesFemalePayQuestions,this.EmployeesMalePayQuestions);
    this.Finance = this.cutomerFormHlper.toFormGroup(this.Funds,this.AccessToMarket,this.AccessToTechnicalSkills);
    this.user.addControl("General",this.General);
    this.user.addControl("Employees",this.Employees);
    this.user.addControl("Finance",this.Finance);
    this.showloading = false;
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
   
    if(this.cooperative_visit.Cooperative_Visit_ID===-1){
      delete this.FlatMe.Cooperative_Visit_ID
      this.EwepserverService.CreateTableData("cooperative_visits",this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Create Done",out);
        this.cooperative_visit.Cooperative_Visit_ID = out;
         
          this.FinanceLoans.forEach((value)=>{
            delete value.finance_ID; 
            value.Cooperative_Visit_ID=this.cooperative_visit.Cooperative_Visit_ID;
          });
          //Fix test if Finace as list else 
          
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.cooperative_visit.Cooperative_Visit_ID,"").subscribe((out)=>{
            //Add New suff
            if(this.FinanceLoans.length>0){
              this.EwepserverService.CreateTableData("cooperative_finance",this.FinanceLoans).subscribe((outFin)=>{
                console.log("Save Done to fin ",outFin);
                console.log(typeof(outFin)); 
                this.backButton.emit("refresh");
              }); 
            }else{
              this.backButton.emit("refresh");
            }
            
          });
          //this.router.navigateByUrl('/cooperative');
       
         
        //this.showloading = false;
        //Move back to list screen
        
      });
    } else{
      this.EwepserverService.updateTableData("cooperative_visits",this.cooperative_visit.Cooperative_Visit_ID,this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Save Done",out);
        console.log(typeof(out));
        if(out===1){
           
          this.FinanceLoans.forEach((value)=>{
            delete value.finance_ID; 
            value.Cooperative_Visit_ID=this.cooperative_visit.Cooperative_Visit_ID;
          });
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.cooperative_visit.Cooperative_Visit_ID,"").subscribe((out)=>{
            //Add New suff
            this.EwepserverService.CreateTableData("cooperative_finance",this.FinanceLoans).subscribe((outFin)=>{
              console.log("Save Done to fin ",outFin);
              console.log(typeof(outFin)); 
              this.backButton.emit("refresh");
              //this.router.navigateByUrl('/visits/cooperative/'+this.cooperative_visit.Cooperative_ID);
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
  addnewFinance(NewFinance){
    delete NewFinance.finance_ID;
    NewFinance.cooperative_visit_ID = this.cooperative_visit.Cooperative_Visit_ID;
    this.FinanceLoans.push(NewFinance);
    //this.FinanceLoans2 = [...this.FinanceLoans];
    this.newFinanceLoan = {finance_ID:0,cooperative_visit_ID:this.cooperative_visit.Cooperative_Visit_ID,cooperative_ID:this.cooperative_visit.Cooperative_ID, 
                            Where_Apply:"",Approved:false,Reject_Reason:"",Reject_Specify:"",How_Much:0.00,
                            Started_Repay:false,Amount_Issued:0.00,Repay_Amount:0.00};
  }
  financeRowClick(Index){
    console.log(Index);
    console.log(this.FinanceLoans[Index]);
    this.newFinanceLoan = this.FinanceLoans[Index];
    this.FinanceLoans.splice(Index,1);
  }
}

interface finance {
  finance_ID:number 
  cooperative_visit_ID:number
  cooperative_ID:number 
  Where_Apply:string  
  Approved:boolean  
  Reject_Reason:string
  Reject_Specify:string 
  How_Much:number 
  Started_Repay:boolean
  Amount_Issued:number
  Repay_Amount:number
}
