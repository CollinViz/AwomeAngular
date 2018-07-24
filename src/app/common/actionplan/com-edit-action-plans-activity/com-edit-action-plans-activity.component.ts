import { Component, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-com-edit-action-plans-activity',
  templateUrl: './com-edit-action-plans-activity.component.html',
  styleUrls: ['./com-edit-action-plans-activity.component.css']
})
export class ComEditActionPlansActivityComponent implements OnInit {
  @Input() activity:any;
  constructor() { }

  ngOnInit() {
  }

}
