import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EwepserverService } from '../../../ewepserver.service';
import { Options, QuestionBase, DropdownQuestion } from '../../../service/question';
import { CustomFromHelperControlService, forceValidate } from '../../../service/custom-from-helper-control.service';
import { CustomformSetupService } from '../../../service/customform-setup.service';
import { FormGroupEditTrainingEntrepreneur } from './FormGroupEditTrainingEnterpreneurs';

@Component({
  selector: 'app-edit-training-entrepreneurs-entrepreneurs',
  templateUrl: './edit-training-entrepreneurs-entrepreneurs.component.html',
  styles: []
})
export class EditTrainingEntrepreneursEntrepreneursComponent implements OnInit, OnChanges {
  @Input() entrepreneur: any = {}
  @Input() TrainingList: any = {}
  @Input() ActiveEDFs: any = {}
  @Output() SaveItem: EventEmitter<any> = new EventEmitter<any>();
  isLoading: boolean = false;
  columns = [
    { name: 'ID', prop: 'EntrepreneurTraining_ID' },
    { name: 'Course Name', prop: 'Title' },
    { name: 'Started Date', prop: 'Date_Started' },
    { name: 'Completed Date', prop: 'Date_Completed' },
    { name: 'Status', prop: 'Status' },
    { name: 'Trainer', prop: 'Trainer' }
  ];
  rows: any[] = [];
  selected = [];
  page: any = { size: 20, totalElements: 500, totalPages: 25, pageNumber: 0 };

  addTraining: FormGroup;
  showEdit: boolean = false;
  bControlLoaded: boolean = false;
  constructor( public EwepserverService: EwepserverService,
    private cutomerFormHlper: CustomFromHelperControlService) { }

  ngOnInit() {
    let frmcontrol = new FormGroupEditTrainingEntrepreneur();
    this.addTraining = this.cutomerFormHlper.toFormGroup(frmcontrol.getTraining());
    this.bControlLoaded = true;
  }
  ngOnChanges(changes) {
    //if(!this.bControlLoaded){
    //  return;
    //}
    if (changes.entrepreneur) {
      this.page.pageNumber = 0;
      this.isLoading = true;
      this.getTraining();
      //Load Stuff
      //this.MainForm.updateValueAndValidity(this.entrepreneur);
    }
  }
  getTraining() {
    const strOptions = "page=" + (Number(this.page.pageNumber) + 1) + "," + this.page.size +"&filter=Country_ID,eq,"+this.EwepserverService.SelectedCountryID +  "&orderby=surname&filter=Entrepreneur_ID,eq," + this.entrepreneur.Entrepreneur_ID;
    this.EwepserverService.getViewData("entrepreneur_training_view", strOptions).subscribe(trining => {
      this.rows = [...trining.records];
      this.isLoading = false;
    });
  }
  setPage(event) {
    console.log('setPage', event);
    this.page.pageNumber = event.offset;
    this.getTraining();
  }
  onActivate(event) {
    if (event.type === "click") {
      console.log('Activate Event', event, this.selected[0].EntrepreneurTraining_ID);
      //load Data from the select to the for entry
      this.addTraining.patchValue(Object.assign({}, this.selected[0]));
      this.showEdit = true;
      //this.router.navigateByUrl('/enterprise/' + this.selected[0].Enterprise_ID);
      //this.IsEditing = true;
      //this.EntrepreneurEditItem = this.selected[0];
    }

  }
  Save() {
    //Do Save 
    let saveData: any = this.cutomerFormHlper.flattenObject(this.addTraining.value);
    saveData.Date_Started = this.cutomerFormHlper.getDateValue(this.addTraining.get("Date_Started").value);
    saveData.Date_Completed = this.cutomerFormHlper.getDateValue(this.addTraining.get("Date_Completed").value);
    saveData.Entrepreneur_ID = this.entrepreneur.Entrepreneur_ID;
    this.EwepserverService.CreateTableData("entrepreneurtraining", saveData).subscribe(response => {
      this.showEdit = false;
      this.getTraining();
    });

  }
  Edit() {
    //Do Save 
    let saveData: any = this.cutomerFormHlper.flattenObject(this.addTraining.value);
    saveData.Date_Started = this.cutomerFormHlper.getDateValue(this.addTraining.get("Date_Started").value);
    saveData.Date_Completed = this.cutomerFormHlper.getDateValue(this.addTraining.get("Date_Completed").value);
    saveData.Entrepreneur_ID = this.entrepreneur.Entrepreneur_ID;
    //saveData.MemberTraining_ID = this.selected[0].MemberTraining_ID
    this.EwepserverService.updateTableData("entrepreneurtraining", this.selected[0].EntrepreneurTraining_ID, saveData).subscribe(response => {
      this.showEdit = false;
      this.getTraining();
    });
    this.showEdit = false;
  }
  Delete() {
    this.cutomerFormHlper.showConfirmDelete("Delete Training for " + this.selected[0].Entrepreneur_Name).subscribe(result => {
      if (result.Result === 'Ok') {
        this.EwepserverService.deleteTableData("entrepreneurtraining", this.selected[0].EntrepreneurTraining_ID).subscribe(info => {
          this.getTraining();
        });
      }
    });
  }
  Back() {
    this.SaveItem.emit(null);
  }
}
