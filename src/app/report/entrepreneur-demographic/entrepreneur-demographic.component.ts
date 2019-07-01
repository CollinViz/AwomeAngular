import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
//const Excel = require('exceljs/modern.nodejs');
//import {Report2Excel} from '../exportExcel'

@Component({
  selector: 'app-entrepreneur-demographic',
  templateUrl: './entrepreneur-demographic.component.html',
  styleUrls: ['./entrepreneur-demographic.component.css']
})
export class EntrepreneurDemographicComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;
  chart2: Chart;
  chart3: Chart;
  chart4: Chart;
  reportData:any={};
  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.technology_view();
  }
  race_view(SearchObject:any) {
    this.Ewep.race_view(SearchObject).subscribe(report => {
      this.intChart(report);
      this.reportData =  report;
    });
  }

  sex_view(SearchObject:any) {
    this.Ewep.sex_view(SearchObject).subscribe(report => {
      this.intChart2(report);
      this.reportData =  report;
    });
  }

  marital_view(SearchObject:any) {
    this.Ewep.marital_view(SearchObject).subscribe(report => {
      this.intChart3(report);
      this.reportData =  report;
    });
  }

  age_view(SearchObject:any) {
    this.Ewep.age_view(SearchObject).subscribe(report => {
      this.intChart4(report);
      this.reportData =  report;
    });
  }
  intChart(report:any) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Race'
      },
      xAxis: {
        categories: report.NameXrow
      },
      series: report.DataSeries,
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
    });
  }

  intChart2(report:any) {
    this.chart2 = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Sex'
      },
      xAxis: {
        categories: report.NameXrow
      },
      series: report.DataSeries,
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
    });
  }

  intChart3(report:any) {
    this.chart3 = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Marital Status'
      },
      xAxis: {
        categories: report.NameXrow
      },
      series: report.DataSeries,
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
    });
  }

  intChart4(report:any) {
    this.chart4 = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Age'
      },
      xAxis: {
        categories: report.NameXrow
      },
      series: report.DataSeries,
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
    });
  }
  SearchClick(SearchObj:any) {
    //this.SelectedProvince = Province;
    this.race_view(SearchObj);
    this.sex_view(SearchObj);
    this.marital_view(SearchObj);
    this.age_view(SearchObj);
  }
  
}
