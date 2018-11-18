import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomFromHelperControlService } from '../../../../service/custom-from-helper-control.service'
import { DatatableRowDetailTemplateDirective } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-list-member-baseline-enterprise',
  templateUrl: './list-member-baseline-enterprise.component.html',
  styles: []
})
export class ListMemberBaselineEnterpriseComponent implements OnInit {
  @Input() rows: any[] = [];
  @Input() selected: any[] = [];
  @Output() rowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDelete: EventEmitter<any> = new EventEmitter<any>();
  lastedSelectedIndex: number = -1;
  Contact: any = {};
  constructor(private frmCustomFormHelper: CustomFromHelperControlService) { }

  ngOnInit() {
  }
  SelectRow(rowSelect, Index) {
    if (this.lastedSelectedIndex >= 0) {
      if (this.lastedSelectedIndex < this.rows.length) {
        this.rows[this.lastedSelectedIndex].selected = false;
      }
    }
    this.rows[Index].selected = true;
    this.lastedSelectedIndex = Index;
    this.selected = this.rows[Index];
    this.rowSelect.emit(rowSelect);
  }
  editItem(rowSelect, Index) {
    this.rowEdit.emit(rowSelect);
  }
  deleteItem(rowSelect, Index) {
    this.frmCustomFormHelper.showConfirmDelete("Delete " + rowSelect.Name + " , " + rowSelect.Surname).subscribe((responce) => {
      if (responce.Result == 'Ok') {
        //Do delete
        this.rowDelete.emit(rowSelect);
      }
    })
  }
}
