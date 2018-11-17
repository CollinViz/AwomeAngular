import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-owner-number-vs-employee-numbers',
  templateUrl: './owner-number-vs-employee-numbers.component.html',
  styles: []
})
export class OwnerNumberVsEmployeeNumbersComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    this.intChart();
  }
  getAgeByGroup() {
    this.Ewep.getAgeByGroup(this.SelectedProvince).subscribe(report => {
      this.intChart();
      report.DataSeries.forEach(element => {
        this.chart.addSerie(element);
      });
    });
  }
  intChart() {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Enterprise age group'
      },
      xAxis: {
        categories: ["< 20 Years", "20-29 Years", "30-39 Years", "40-49 Years", "50-59 Years", "60-69 Years", "> 69 Years"]
      },
      series: [],
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
    this.getAgeByGroup();
  }

}
