import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
//const Excel = require('exceljs/modern.nodejs');
import {Report2Excel} from '../exportExcel'
@Component({
  selector: 'app-jobs-created',
  templateUrl: './jobs-created.component.html',
  styles: []
})
export class JobsCreatedComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;
  reportData:any={};
  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.jobs_created_view();
  }
  jobs_created_view(SearchObject:any) {
    this.Ewep.jobs_created_view(SearchObject).subscribe(report => {
      this.intChart(report);
      this.reportData =  report;
    });
  }
  intChart(report:any) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of Employees'
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
    this.jobs_created_view(SearchObj);
  }
  exportExcel(){
    let ex = new Report2Excel()
    ex.createExcel(this.reportData.NameXrow,this.reportData.DataSeries);
  }
}
