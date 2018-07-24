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
import {FormGroupMapVisitsCooperative} from '../form-group-map-visits-cooperative'

@Component({
  selector: 'app-editfrm-visits-cooperative',
  templateUrl: './editfrm-visits-cooperative.component.html',
  styles: []
})
export class EditfrmVisitsCooperativeComponent implements OnInit {
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

  cooperative:any={};
  showloading:boolean = true;
  FinanceLoans:any[] =[];
  FinanceLoans2:any[] =[];
  newFinanceLoan:finance={finance_ID:0,cooperative_ID:0,Where_Apply:"new",
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
      Cooperative_ID: new FormControl('1'),
      Cooperative_Name: new FormControl('BOB') 
    });
    let frmEditVisit = new FormGroupMapVisitsCooperative(this.EwepserverService);
    this.GeneralQuestions  = frmEditVisit.getCooperativeGeneralForm(this.cooperative);
    this.General = this.cutomerFormHlper.toFormGroup(this.GeneralQuestions);
    
    this.EmployeesFemaleQuestions = frmEditVisit.getCooperativeEmployeesFormFemale(this.cooperative);
    this.EmployeesMaleQuestions = frmEditVisit.getCooperativeEmployeesFormMale(this.cooperative);
    this.EmployeesFemalePayQuestions = frmEditVisit.getCooperativeEmployeesFormFeMalePay(this.cooperative);
    this.EmployeesMalePayQuestions = frmEditVisit.getCooperativeEmployeesFormMalePay(this.cooperative);
    this.EmployeesQuestions = frmEditVisit.getCooperativeEmployeesFormAge(this.cooperative);
    this.Funds = frmEditVisit.getStartUpFunds(this.cooperative);
    this.AccessToMarket =frmEditVisit.getAccessToMarket(this.cooperative); 
    this.AccessToTechnicalSkills = frmEditVisit.getAccessToTechnicalSkills(this.cooperative); 
    
    
    
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
  cooperative_ID:number 
  Where_Apply:string  
  Approved:string  
  Reject_Reason:string
  Reject_Specify:string 
  How_Much:string 
  Started_Repay:string
}
