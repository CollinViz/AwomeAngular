import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params,NavigationEnd} from '@angular/router'; 
import {Country,EwepserverService,InternetConnection,LogInData} from '../ewepserver.service'
import { Observable } from 'rxjs';
import { ProgressInterceptor } from '../service/ProgressInterceptor'
import { UrlResolver } from '../../../node_modules/@angular/compiler';
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
  hideAdminSection:boolean =  true;
  countryList$: Observable<Country[]>;
  ErrorInterNet$:Observable<InternetConnection>;
  LoginData$:Observable<LogInData>;
  showError:boolean=false;
  ErrorMessage:string="";
  ShowAllMenu:boolean = false;
  hideAssociation:boolean = true;
  constructor( private router: Router,
                 public EwepserverService: EwepserverService,
                private interceptor: ProgressInterceptor) { 
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
    this.countryList$ = this.EwepserverService.country;
    this.ErrorInterNet$ = this.interceptor.ErrorMessage$;
    this.LoginData$ = this.EwepserverService.LoginOK;
    this.clearSelect();
    if(!this.router.events){
      return;
    }
    this.router.events.subscribe((info:any)=>{
      if((info instanceof NavigationEnd)){
        //Hid error box
        this.showError= false;

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
      this.showError= false;
      this.ErrorMessage = error.ErrorMessage;
      if(error.ErrorMessage.trim()!=""){
        this.showError= true;
      }
    });
    this.LoginData$.subscribe((User:LogInData)=>{
      console.log("this.LoginData$",User);
      if(User.LoginOK){  
        if(User.Country_ID==3){
          this.hideAssociation =false;
        }else{
          this.hideAssociation =true;
        }       
        this.ShowAllMenu = true;
        this.currentCountryID = User.Country_ID;
        this.currentCountry = User.Country_Name;
        this.hideAdminSection = ((User.Security_Level=="Admin")?false:true);
      }      
    });
     
  }
  changeCountry(newCountry,Index){
    this.currentCountry = newCountry.Country_Name;
    this.currentCountryID = newCountry.Country_ID;
    this.EwepserverService.setCountryInfo(this.currentCountryID,this.currentCountry,newCountry.Currency);
    if(!this.isHome){
      this.router.navigate(['/', 'loginok']);
    }
  }
}
