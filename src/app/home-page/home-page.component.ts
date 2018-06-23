import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  home:any = {login:false}
  constructor() { }

  ngOnInit() {
  }
  showlogin(){
    console.log("change login");
    this.home.login = this.home.login?false:true;

  }
}
