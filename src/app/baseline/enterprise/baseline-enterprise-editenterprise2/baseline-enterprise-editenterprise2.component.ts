import { ChangeDetectorRef,Component, OnInit,Pipe, PipeTransform,TemplateRef  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormControl, FormGroup ,Validators} from '@angular/forms'; 
import {EwepserverService} from '../../../ewepserver.service' 
import { QuestionBase } from '../../../service/question-base'; 
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'

@Component({
  selector: 'app-baseline-enterprise-editenterprise2',
  templateUrl: './baseline-enterprise-editenterprise2.component.html',
  styleUrls: ['./baseline-enterprise-editenterprise2.component.css']
})
export class BaselineEnterpriseEditenterprise2Component implements OnInit {
  GeneralQuestions:QuestionBase<any>[]
  EmployeesQuestions:QuestionBase<any>[]
  EmployeesFemaleQuestions:QuestionBase<any>[]
  EmployeesMaleQuestions:QuestionBase<any>[]
  EmployeesFemalePayQuestions:QuestionBase<any>[]
  EmployeesMalePayQuestions:QuestionBase<any>[]
  Funds:QuestionBase<any>[];
  AccessToMarket:QuestionBase<any>[];
  AccessToTechnicalSkills:QuestionBase<any>[];

  enterprise:any={};
  FlatMe:any={};
  Provinces =[];
  DistrictMetroAll =[];
  DistrictMetro =[];
  localMunicipalityAll =[];
  localMunicipality =[];
  showloading:boolean = true;
  FinanceLoans:any[] =[];
  FinanceLoans2:any[] =[];
  newFinanceLoan:finance={finance_ID:0,enterprise_ID:0,Where_Apply:"new",
                          Approved:"",Reject_Reason:"",Reject_Specify:"",
                          How_Much:"",Started_Repay:""};
  //Form Group stuff
  user: FormGroup;
  General:FormGroup;
  Employees:FormGroup;
  Finance: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,private router: Router,
              private EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService,
              private controlsService:CustomformSetupService,
              private _cdr : ChangeDetectorRef ) { 
    EwepserverService.getProvince().subscribe((customers:any)=>{
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
    });

  }

  ngOnInit() {
    
    
    this.activatedRoute.params
    // NOTE: I do not use switchMap here, but subscribe directly
    .subscribe((params: Params) => {
      console.log(params.Enterprise_ID);
      if(params.Enterprise_ID){
        if(params.Enterprise_ID>0){
          
          this.EwepserverService.getEnterprisItem(params.Enterprise_ID).subscribe((customers:any)=>{
            //console.log(customers);
            this.enterprise = customers; 
            this.OnDataOK();
          });
        }else{ 
          //Add New 
          console.log("Add new");
          this.enterprise = {Enterprise_ID:-1,Enterprise_Name:""};
          this.OnDataOK();
          console.log("Should be done"); 
        }
      }
    });
    
    

  }
  OnDataOK(){ 

    this.user = new FormGroup({
      Enterprise_ID: new FormControl(this.enterprise.Enterprise_ID),
      Enterprise_Name: new FormControl(this.enterprise.Enterprise_Name,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]) 
    });

    this.GeneralQuestions  = this.controlsService.getEnterpriseGenralForm(this.enterprise);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);
    
    this.EmployeesFemaleQuestions = this.controlsService.getEnterpriseEmploeesFormFemale(this.enterprise);
    this.EmployeesMaleQuestions = this.controlsService.getEnterpriseEmploeesFormMale(this.enterprise);
    this.EmployeesFemalePayQuestions = this.controlsService.getEnterpriseEmploeesFormFeMalePay(this.enterprise);
    this.EmployeesMalePayQuestions = this.controlsService.getEnterpriseEmploeesFormMalePay(this.enterprise);
    this.EmployeesQuestions = this.controlsService.getEnterpriseEmploeesFormAge(this.enterprise);
    this.Funds = this.controlsService.getStatUpFunds(this.enterprise);
    this.AccessToMarket =this.controlsService.getAccessToMarket(this.enterprise); 
    this.AccessToTechnicalSkills = this.controlsService.getAccessToTechnicalSkills(this.enterprise); 
    
    
    
    this.Employees = this.cutomerFormHlper.toFormGroup(this.EmployeesFemaleQuestions,this.EmployeesQuestions,this.EmployeesMaleQuestions,this.EmployeesFemalePayQuestions,this.EmployeesMalePayQuestions);
    this.Finance = this.cutomerFormHlper.toFormGroup(this.Funds,this.AccessToMarket,this.AccessToTechnicalSkills);
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
    if(this.enterprise.Enterprise_ID===-1){
      delete this.FlatMe.Enterprise_ID
      this.EwepserverService.CreateTableData("enterprise",this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Create Done",out);
        this.router.navigateByUrl('/enterprise');
         
        //this.showloading = false;
        //Move back to list screen
        
      });
    } else{
      this.EwepserverService.updateTableData("enterprise",this.enterprise.Enterprise_ID,this.FlatMe ).subscribe((out)=>{
        //Show Saving
        console.log("Save Done",out);
        //if(out==="1"){
          this.router.navigateByUrl('/enterprise');
        //}
        //this.showloading = false;
        //Move back to list screen
        
      });
    }   
    //this.showloading = true;
   
  }
  addnewFinance(){
    this.FinanceLoans.push(this.newFinanceLoan);
    //this.FinanceLoans2 = [...this.FinanceLoans];
    this.newFinanceLoan = {finance_ID:0,enterprise_ID:0,Where_Apply:"new",
                            Approved:"",Reject_Reason:"",Reject_Specify:"",
                            How_Much:"",Started_Repay:""};
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
  enterprise_ID:number 
  Where_Apply:string  
  Approved:string  
  Reject_Reason:string
  Reject_Specify:string 
  How_Much:string 
  Started_Repay:string
}