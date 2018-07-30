import { ChangeDetectorRef,Component, OnInit,Pipe, PipeTransform,TemplateRef  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service' 
import { QuestionBase } from '../../../service/question-base'; 
import { CustomFromHelperControlService,forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'
import { ValueTransformer } from '../../../../../node_modules/@angular/compiler/src/util';


@Component({
  selector: 'app-baseline-coop-editcoop2',
  templateUrl: './baseline-coop-editcoop2.component.html',
  styleUrls: ['./baseline-coop-editcoop2.component.css']
})
export class BaselineCoopEditcoop2Component implements OnInit {
  GeneralQuestions:QuestionBase<any>[]
  EmployeesQuestions:QuestionBase<any>[]
  EmployeesFemaleQuestions:QuestionBase<any>[]
  EmployeesMaleQuestions:QuestionBase<any>[]
  EmployeesFemalePayQuestions:QuestionBase<any>[]
  EmployeesMalePayQuestions:QuestionBase<any>[]
  Funds:QuestionBase<any>[];
  AccessToMarket:QuestionBase<any>[];
  AccessToTechnicalSkills:QuestionBase<any>[];

  cooperative:any={};
  FlatMe:any={};
  Provinces =[];
  DistrictMetroAll =[];
  DistrictMetro =[];
  localMunicipalityAll =[];
  localMunicipality =[];
  showloading:boolean = true;
  FinanceLoans:any[] =[];
  FinanceLoans2:any[] =[];
  newFinanceLoan:finance={finance_ID:0,cooperative_ID:0,Where_Apply:"",
                          Approved:false,Reject_Reason:"",Started_Repay:false,
                          How_Much:0.00,Amount_Issued:0.00,Repay_Amount:0.00};
  //Form Group stuff
  user: FormGroup;
  General:FormGroup;
  Employees:FormGroup;
  Finance: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,private router: Router,
              private EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService,
              private _cdr : ChangeDetectorRef ) { 
    /*EwepserverService.getProvince().subscribe((customers:any)=>{
      console.log(customers.records);
      this.Provinces = customers.records; 
    });
    EwepserverService.getDistrictMetro().subscribe((customers:any)=>{
      console.log(customers.records);
      this.DistrictMetroAll = customers.records; 
    });
    EwepserverService.getlocalMunicipality().subscribe((customers:any)=>{
      console.log(customers.records);
      this.localMunicipalityAll = customers.records; 
    });*/

  }

  ngOnInit() {
    
    
    this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Cooperative_ID);
      if(params.Cooperative_ID){
        if(params.Cooperative_ID>0){
          
          this.EwepserverService.getCooperativeItem(params.Cooperative_ID).subscribe((customers:any)=>{
            //console.log(customers);
            this.cooperative = customers; 
            this.EwepserverService.getTableData("cooperative_finance","filter=Cooperative_ID,eq,"+params.Cooperative_ID).subscribe((finance:any)=>{
              this.FinanceLoans = finance.records;
              this.OnDataOK();
            });
            
          });
        }else{ 
          //Add New 
          console.log("Add new");
          this.cooperative = {Cooperative_ID:-1,Cooperative_Name:""};
          this.OnDataOK();
          console.log("Should be done"); 
        }
      }
    });
    
    

  }
  OnDataOK(){ 

    this.user = new FormGroup({
      Cooperative_ID: new FormControl(this.cooperative.Cooperative_ID),
      Cooperative_Name: new FormControl(this.cooperative.Cooperative_Name,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]) 
    });

    this.GeneralQuestions  = this.controlsService.getEnterpriseGenralForm(this.cooperative);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);
    
    this.EmployeesFemaleQuestions = this.controlsService.getEnterpriseEmploeesFormFemale(this.cooperative);
    this.EmployeesMaleQuestions = this.controlsService.getEnterpriseEmploeesFormMale(this.cooperative);
    this.EmployeesFemalePayQuestions = this.controlsService.getEnterpriseEmploeesFormFeMalePay(this.cooperative);
    this.EmployeesMalePayQuestions = this.controlsService.getEnterpriseEmploeesFormMalePay(this.cooperative);
    this.EmployeesQuestions = this.controlsService.getEnterpriseEmploeesFormAge(this.cooperative);
    this.Funds = this.controlsService.getStatUpFunds(this.cooperative);
    this.AccessToMarket =this.controlsService.getAccessToMarket(this.cooperative); 
    this.AccessToTechnicalSkills = this.controlsService.getAccessToTechnicalSkills(this.cooperative); 
    
    
    
    this.Employees = this.cutomerFormHlper.toFormGroup(this.EmployeesFemaleQuestions,this.EmployeesQuestions,this.EmployeesMaleQuestions,this.EmployeesFemalePayQuestions,this.EmployeesMalePayQuestions);
    this.Finance = this.cutomerFormHlper.toFormGroup(this.Funds,this.AccessToMarket,this.AccessToTechnicalSkills);
    this.Finance.setValidators([forceValidate("Training_Qtr",[{name:"What_Training"},{name:"Who_Traininig",min:4,max:25},
                                                             {name:"When_Training",min:4,max:25},
                                                             {name:"How_Know_Training" }])]);
    this.user.addControl("General",this.General);
    this.user.addControl("Employees",this.Employees);
    this.user.addControl("Finance",this.Finance);
    this.showloading = false;
  }

  falter(){
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
  }
  Save(){
    console.log("When_Training",this.Finance.get('When_Training').value);
    this.FlatMe = this.cutomerFormHlper.flattenObject(this.user.value);
    //Fix Date from the Material Control
    this.FlatMe.When_Training = this.cutomerFormHlper.getDateValue(this.Finance.get('When_Training').value);
    if(this.cooperative.Cooperative_ID===-1){
      delete this.FlatMe.Cooperative_ID
      this.EwepserverService.CreateTableData("cooperative",this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Create Done",out);
        
        if(out===1){
          this.FinanceLoans.forEach((value)=>{
            delete value.finance_ID; 
            value.Cooperative_ID=this.cooperative.Cooperative_ID;
          });
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.cooperative.Cooperative_ID,"").subscribe((out)=>{
            //Add New suff
            this.EwepserverService.CreateTableData("finance",this.FinanceLoans).subscribe((outFin)=>{
              console.log("Save Done to fin ",outFin);
              console.log(typeof(outFin)); 
              this.router.navigateByUrl('/cooperative');
            }); 
          });
          //this.router.navigateByUrl('/cooperative');
        } 
         
        //this.showloading = false;
        //Move back to list screen
        
      });
    } else{
      this.EwepserverService.updateTableData("cooperative",this.cooperative.Cooperative_ID,this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Save Done",out);
        console.log(typeof(out));
        if(out===1){
           
          this.FinanceLoans.forEach((value)=>{
            delete value.finance_ID; 
            value.Cooperative_ID=this.cooperative.Cooperative_ID;
          });
          //delete all finance stuff and create a new one
          this.EwepserverService.deleteAllFinance(this.cooperative.Cooperative_ID,"").subscribe((out)=>{
            //Add New suff
            this.EwepserverService.CreateTableData("finance",this.FinanceLoans).subscribe((outFin)=>{
              console.log("Save Done to fin ",outFin);
              console.log(typeof(outFin)); 
              this.router.navigateByUrl('/cooperative');
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
    NewFinance.cooperative_ID = this.cooperative.Cooperative_ID;
    this.FinanceLoans.push(NewFinance);
    //this.FinanceLoans2 = [...this.FinanceLoans];
    this.newFinanceLoan = {finance_ID:0,cooperative_ID:this.cooperative.Cooperative_ID,Where_Apply:"",
                            Approved:false,Reject_Reason:"",Started_Repay:false,
                            How_Much:0.00,Amount_Issued:0.00,Repay_Amount:0.00};
  }
  financeRowClick(Index){
    console.log(Index);
    console.log(this.FinanceLoans[Index]);
    this.newFinanceLoan = this.FinanceLoans[Index];
    this.FinanceLoans.splice(Index,1);
  }
  
}

 
interface finance {
  finance_ID:number,
  Cooperative_ID?:number, 
  cooperative_ID:number 
  Where_Apply:string  
  Approved:boolean  
  Reject_Reason:string 
  How_Much:number 
  Started_Repay:boolean,
  Amount_Issued:number,
  Repay_Amount:number
}