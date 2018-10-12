import { Component, Input, OnInit, OnChanges }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { CustomformSetupService } from '../../../service/customform-setup.service';
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'
 


@Component({
  selector: 'app-editenterprise-enterprise-development',
  templateUrl: './editenterprise-enterprise.component.html',
  styleUrls: ['./editenterprise-enterprise.component.css']
})
export class EditenterpriseEnterpriseComponent implements OnInit {
  @Input() enterprise:any ={};
  Qustions :any = {}
  //form: FormGroup; 
  constructor(private customComp:CustomformSetupService,private customHelper:CustomFromHelperControlService) { 
    this.Qustions = customComp.getEnterpriseDevelopmentForm(this.enterprise);
  }

  ngOnChanges() {

  }
  
  ngOnInit() {

  }

}
