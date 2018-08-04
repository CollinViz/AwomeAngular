import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { CustomformSetupService } from '../../../service/customform-setup.service';
import { CustomFromHelperControlService } from '../../../service/custom-from-helper-control.service'


@Component({
  selector: 'app-editcoop-coop',
  templateUrl: './editcoop-coop.component.html',
  styleUrls: ['./editcoop-coop.component.css']
})
export class EditcoopCoopComponent implements OnInit {
  @Input() cooperative:any ={};
  Qustions :any = {}
  //form: FormGroup; 
  constructor(private customComp:CustomformSetupService,private customHelper:CustomFromHelperControlService) { 
    this.Qustions = customComp.getEnterpriseDevelopmentForm(this.cooperative);
  }

  ngOnInit() {

  }

}
