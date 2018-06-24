import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Output() loginClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  login(){
    console.log("Button Click");
    this.loginClick.emit();
  }
}
