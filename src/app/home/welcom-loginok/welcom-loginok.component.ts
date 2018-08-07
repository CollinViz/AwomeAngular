import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service'

@Component({
  selector: 'app-welcom-loginok',
  templateUrl: './welcom-loginok.component.html',
  styleUrls: ['./welcom-loginok.component.css']
})
export class WelcomLoginokComponent implements OnInit {
  UserInfo:any;
  constructor(private EwepserverService: EwepserverService) { }

  ngOnInit() {
    //this.EwepserverService.UserLoginObjAnnounced$.subscribe((UserInfo:any)=>{
    //  this.UserInfo = UserInfo;
    //})
  }

}
