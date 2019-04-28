import { Component, OnInit } from '@angular/core';
import { LogInData, EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  UserInfo: any;
  currentCountry: string = "";
  currentCountryID: number = 0;
  bg_Namibia: boolean = false;
  bg_SA: boolean = false; 
   
  displayedColumns: string[] = ['total', 'female', 'male', 'target'];
  sexTotalData = {
    total: 0,
    female: 0, male: 0, target: 500
  };
  chart2: Chart;
  chart: Chart;
  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    this.loadChartData();
  }
  loadChartData() {

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
  intchart2(reportinfo: any) {
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
  intchat(reportinfo) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Baseline'
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
