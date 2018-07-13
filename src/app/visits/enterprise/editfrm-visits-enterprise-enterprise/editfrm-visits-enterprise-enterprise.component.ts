import { Component, OnInit,EventEmitter ,Output } from '@angular/core';
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
export class EditfrmVisitsEnterpriseEnterpriseComponent implements OnInit {
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

  enterprise:any={};
  showloading:boolean = true;
  FinanceLoans:any[] =[];
  FinanceLoans2:any[] =[];
  newFinanceLoan:finance={finance_ID:0,enterprise_ID:0,Where_Apply:"new",
                          Approved:"",Reject_Reason:"",Reject_Specify:"",
                          How_Much:"",Started_Repay:""};
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private EwepserverService: EwepserverService,private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService:CustomformSetupService  ) { }
    // @Output() SelectClick = new EventEmitter<number>();
    @Output() backButton = new EventEmitter<string>();

  ngOnInit() {
    this.showloading = true;
    this.OnDataOK();
  }
  OnDataOK(){ 
    this.user = new FormGroup({
      Enterprise_ID: new FormControl('1'),
      Enterprise_Name: new FormControl('BOB') 
    });
    let frmEditVisit = new FormGroupMapVisitsEnterprise(this.EwepserverService);
    this.GeneralQuestions  = frmEditVisit.getEnterpriseGenralForm(this.enterprise);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);
    
    this.EmployeesFemaleQuestions = frmEditVisit.getEnterpriseEmploeesFormFemale(this.enterprise);
    this.EmployeesMaleQuestions = frmEditVisit.getEnterpriseEmploeesFormMale(this.enterprise);
    this.EmployeesFemalePayQuestions = frmEditVisit.getEnterpriseEmploeesFormFeMalePay(this.enterprise);
    this.EmployeesMalePayQuestions = frmEditVisit.getEnterpriseEmploeesFormMalePay(this.enterprise);
    this.EmployeesQuestions = frmEditVisit.getEnterpriseEmploeesFormAge(this.enterprise);
    this.Funds = frmEditVisit.getStatUpFunds(this.enterprise);
    this.AccessToMarket =frmEditVisit.getAccessToMarket(this.enterprise); 
    this.AccessToTechnicalSkills = frmEditVisit.getAccessToTechnicalSkills(this.enterprise); 
    
    
    
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
