import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import {Country,EwepserverService} from '../../ewepserver.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginOK = new EventEmitter<any>();
  user:UserLogin =  {Username:"",Password:"",showError:false,Error:"",countrylogin:null};
  countryList$: Observable<Country[]>;
  constructor(private EwepserverService: EwepserverService) { }

  onClick(){
    if(this.user.countrylogin==null){
      alert("Please select a Country");
      return;
    }
    this.EwepserverService.checkLogin(this.user.Username,this.user.Password).subscribe((Message:any)=>{
      if(Message.OK){
        //We have a error
        this.user.Password="";
        this.user.showError = true;
        this.user.Error = Message.message;
      }else{
        this.EwepserverService.setUserLogin(Message,this.user.countrylogin);
        //this.EwepserverService.setCountryInfo(this.user.countrylogin.Country_ID,this.user.countrylogin.Country_Name);
        this.loginOK.emit(Message);
      } 
    });
  }
  ngOnInit() {
    this.countryList$ = this.EwepserverService.country;
  }

}

class UserLogin{
  public Username:string ="";
  public Password:string="";
  public showError:boolean=false;
  public Error:string ="";
  public countrylogin?;
}
 