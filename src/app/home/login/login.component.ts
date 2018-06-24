import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginOK = new EventEmitter<any>();
  user:UserLogin =  {Username:"",Password:"",showError:false,Error:""};

  constructor(private EwepserverService: EwepserverService) { }

  onClick(){
    this.EwepserverService.checkLogin(this.user.Username,this.user.Password).subscribe((Message:any)=>{
      if(Message.OK){
        //We have a error
        this.user.Password="";
        this.user.showError = true;
        this.user.Error = Message.message;
      }else{
        this.EwepserverService.setUserLogin(Message);
        this.loginOK.emit(Message);
      } 
    });
  }
  ngOnInit() {
  }

}

class UserLogin{
  public Username:string ="";
  public Password:string="";
  public showError:boolean=false;
  public Error:string ="";
}
 