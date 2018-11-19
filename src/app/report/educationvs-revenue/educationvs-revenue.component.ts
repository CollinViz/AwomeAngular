import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-educationvs-revenue',
  templateUrl: './educationvs-revenue.component.html',
  styles: []
})
export class EducationvsRevenueComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    this.education_level_view();
  }
  education_level_view() {
    this.Ewep.education_level_view(this.SelectedProvince).subscribe(report => {
      this.intChart(report); 
    });
  }
  intChart(report:any) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Level of Education'
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
  SearchClick(Province: string) {
    this.SelectedProvince = Province;
    this.education_level_view();
  }
}
