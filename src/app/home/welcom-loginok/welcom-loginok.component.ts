import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-welcom-loginok',
  templateUrl: './welcom-loginok.component.html',
  styleUrls: ['./welcom-loginok.component.css']
})
export class WelcomLoginokComponent implements OnInit {
  UserInfo: any;
  displayedColumns: string[] = ['total', 'female', 'male', 'target'];
  sexTotalData = {
    total: 0,
    female: 0, male: 0, target: 500
  };

  chart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Entrepreneur vs. Enterprise'
    },
    xAxis: {
      categories: ["Entrepreneurs", "Enterprises"]
    },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
  });




  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.EwepserverService.UserLoginObjAnnounced$.subscribe((UserInfo:any)=>{
    //  this.UserInfo = UserInfo;
    //})

    this.Ewep.listCountOFentrepreneurAndenterprise().subscribe((report: any) => {

      report.DataSeries.forEach(element => {
        this.chart.addSerie(element);
      });

    });
    this.Ewep.getSexCount().subscribe((report: any) => {

      this.sexTotalData = {
        total: report.Female + report.Male,
        female: report.Female, male: report.Male, target: 500
      };

    });

  }

}
