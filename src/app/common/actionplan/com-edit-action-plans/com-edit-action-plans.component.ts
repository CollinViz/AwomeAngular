import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-com-edit-action-plans',
  templateUrl: './com-edit-action-plans.component.html',
  styles: []
})
export class ComEditActionPlansComponent implements OnInit {
  @Input() ActionPlan:any={}
  constructor() { }

  ngOnInit() {
  }

}
