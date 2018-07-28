import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { EwepserverService } from '../../../ewepserver.service'
import { QuestionBase,DropdownQuestion,Options } from '../../../service/question';
import { CustomFromHelperControlService,forceValidate } from '../../../service/custom-from-helper-control.service'
import { CustomformSetupService } from '../../../service/customform-setup.service'


@Component({
  selector: 'app-com-edit-contact',
  templateUrl: './com-edit-contact.component.html',
  styles: []
})
export class ComEditContactComponent implements OnInit {
  @Input() EditRow: any = {};
  //@Input() isValid:boolean=false;
  @Input() form: FormGroup;
  @Input() ContactInfo: QuestionBase<any>[];
  @Input() ContactInfoWithBinding: QuestionBase<any>[];

  constructor(private EwepserverService: EwepserverService,
    private cutomerFormHlper: CustomFromHelperControlService,
    private controlsService: CustomformSetupService) {

    //this.ContactInfo = this.controlsService.getContactInfoNonBinding(this.EditRow);
    //this.ContactInfoWithBinding = this.controlsService.getContactInfoBinding(this.EditRow);



  }

  ngOnInit() {
    //this.form.addControl("Contacts", this.cutomerFormHlper.toFormGroup(this.ContactInfo, this.ContactInfoWithBinding));

  }
  get isValid() {
    return false;
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
