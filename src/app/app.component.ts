import { Component,OnInit } from '@angular/core';
import {Country,EwepserverService,InternetConnection,LogInData} from './ewepserver.service'
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

declare var fnc_messge: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  CurrentTheme:string="Default";
  LoginData$:Observable<LogInData>;
  title = 'app';
  cssUrl: string;
   
  constructor(private ewepserverService: EwepserverService,
    public sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.cssUrl = "/assets/Default_bootstrap.min.css"
    fnc_messge("Default");
    this.LoginData$ = this.ewepserverService.LoginOK;
    this.LoginData$.subscribe((User:LogInData)=>{
      if(User.LoginOK){
        this.CurrentTheme = User.Theme;
        fnc_messge(this.CurrentTheme);
        this.cssUrl = "/assets/"+ this.CurrentTheme + "_bootstrap.min.css"
      }      
    });
  }
  
}
