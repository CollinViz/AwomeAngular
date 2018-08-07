import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params,NavigationEnd} from '@angular/router'; 
import {Country,EwepserverService,InternetConnection,LogInData} from '../ewepserver.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isHome:boolean = true; 
  isBaseLine:boolean = true; 
  isVisits:boolean = true; 
  isActionPlan:boolean = true; 
  isTraining:boolean = true; 
  isReports:boolean = true; 
  isAdmin:boolean = true; 
  currentCountry:string= "";
  currentCountryID:number= 0;
  
  countryList$: Observable<Country[]>;
  ErrorInterNet$:Observable<InternetConnection>;
  LoginData$:Observable<LogInData>;
  showError:boolean=false;
  ErrorMessage:string="";
  ShowAllMenu:boolean = false;
  constructor( private router: Router,
                private ewepserverService: EwepserverService) { 
    this.currentCountry="South Africa";
    this.currentCountryID=1;

  }
  clearSelect(){
    this.isHome=true; 
    this.isBaseLine=false; 
    this.isVisits=false;  
    this.isActionPlan=false;  
    this.isTraining=false;  
    this.isReports=false;  
    this.isAdmin=false;  
  }
  ngOnInit() {
    this.countryList$ = this.ewepserverService.country;
    this.ErrorInterNet$ = this.ewepserverService.internetInfo;
    this.LoginData$ = this.ewepserverService.LoginOK;
    this.clearSelect();
    if(!this.router.events){
      return;
    }
    this.router.events.subscribe((info:any)=>{
      if((info instanceof NavigationEnd)){
        
        const NavInfo = (info as NavigationEnd);
        let baseURL = NavInfo.url.split('/');
        console.log("Nav events",baseURL,info);
        this.clearSelect();
        if(baseURL[1]=="baseline"){
          this.isBaseLine= true;
          this.isHome=false;
        }
        if(baseURL[1]=="visits"){
          this.isVisits= true;
          this.isHome=false;
        }
        if(baseURL[1]=="actionplans"){
          this.isActionPlan= true;
          this.isHome=false;
        }
        if(baseURL[1]=="training"){
          this.isTraining= true;
          this.isHome=false;
        }
        if(baseURL[1]=="admin"){
          this.isAdmin= true;
          this.isHome=false;
        }
      }
      
    });
    this.ErrorInterNet$.subscribe((error:InternetConnection)=>{
      this.showError= true;
      this.ErrorMessage = error.ErrorMessage;
    });
    this.LoginData$.subscribe((User:LogInData)=>{
      if(User.LoginOK){
        this.ShowAllMenu = true;
      }
      
    })
  }
  changeCountry(newCountry,Index){
    this.currentCountry = newCountry.Country_Name;
    this.currentCountryID = newCountry.Country_ID;
    this.ewepserverService.setCountryInfo(this.currentCountryID,this.currentCountry);
  }
}
