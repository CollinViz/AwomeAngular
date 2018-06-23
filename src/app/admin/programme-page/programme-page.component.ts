import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-programme-page',
  templateUrl: './programme-page.component.html',
  styleUrls: ['./programme-page.component.css']
})
export class ProgrammePageComponent implements OnInit {
  SelectItem :any[] =null;
  ShowEdit:boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  itemClick(event){
    console.log(event );
    //this.ShowEdit = true;
    this.router.navigateByUrl("/admin/programme/"+event)
  }
  SaveClick(){
    this.ShowEdit = false;
  }
  CancelClick(){
    this.ShowEdit = false;
  }
}
