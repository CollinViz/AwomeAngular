import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() edf:any;
  @Input() Province:any[];
  @Input() Titles:any[];
  @Input() Programme:any[];
  @Input() edfList:any[];
  @Input() Countrylist:any[]
  @Input() Theme:any[]
  constructor() { }

  ngOnInit() {
    console.log("In User edit ",this.Titles);
  }

}
