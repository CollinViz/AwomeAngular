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
  chart2:Chart;
  chart:Chart; 




  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.EwepserverService.UserLoginObjAnnounced$.subscribe((UserInfo:any)=>{
    //  this.UserInfo = UserInfo;
    //})

    this.Ewep.listCountOFentrepreneurAndenterprise().subscribe((report: any) => {

      this.intchat(report);

    });
    this.Ewep.getTraining("").subscribe((report: any) => {

      this.intchart2(report);

    }); 
    this.Ewep.getSexCount().subscribe((report: any) => {

      this.sexTotalData = {
        total: Number(report.Female) + Number(report.Male),
        female: report.Female, male: report.Male, target: 500
      };

    });

  }
  intchart2(reportinfo:any){
    this.chart2 = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Training'
      },
      xAxis: {
        categories: reportinfo.NameXrow
      },
      series: reportinfo.DataSeries,
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
    });
  }
  intchat(reportinfo){
    this.chart= new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Base Line'
      },
      xAxis: {
        categories: reportinfo.NameXrow
      },
      series: reportinfo.DataSeries,
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
    });
  }

}
