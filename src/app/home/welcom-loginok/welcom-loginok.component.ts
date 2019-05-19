import { Component, OnInit } from '@angular/core';
import { LogInData, EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-welcom-loginok',
  templateUrl: './welcom-loginok.component.html',
  styleUrls: ['./welcom-loginok.component.css']
})
export class WelcomLoginokComponent implements OnInit {
  
  UserInfo: any;
  currentCountry: string = "";
  currentCountryID: number = 0;
  bg_Namibia: boolean = false;
  bg_SA: boolean = false;
  hideAssociation: boolean = false;
  LoginData$: Observable<LogInData>;
  displayedColumns: string[] = ['total', 'female', 'male', 'target'];
  sexTotalData = {
    total: 0,
    female: 0, male: 0, target: 500
  };
  chart2: Chart;
  chart: Chart;




  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.EwepserverService.UserLoginObjAnnounced$.subscribe((UserInfo:any)=>{
    //  this.UserInfo = UserInfo;
    //})
    if (this.Ewep.SelectedCountryID == 3) {
      this.hideAssociation = true;
    }
    this.LoginData$ = this.Ewep.LoginOK;
    this.LoginData$.subscribe((User: LogInData) => {
      console.log("app-welcom-loginok$", User);
      if (User.LoginOK) {
        this.bg_Namibia = false;
          this.bg_SA = false;
        if (User.Country_ID == 3) {
          this.hideAssociation = true;
          this.bg_Namibia = true;
          this.bg_SA = false;
        } else {
          this.hideAssociation = false;
        }
        if (User.Country_ID == 1) {
          this.bg_Namibia = false;
          this.bg_SA = true;
        }
        this.currentCountryID = User.Country_ID;
        this.currentCountry = User.Country_Name;
        //this.loadChartData();
      }
    });
    //this.loadChartData();
  }
  


}
