import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-most-popular-training',
  templateUrl: './most-popular-training.component.html',
  styles: []
})
export class MostPopularTrainingComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    this.popular_training_view();
  }
  popular_training_view() {
    this.Ewep.popular_training_view(this.SelectedProvince).subscribe(report => {
      this.intChart(report); 
    });
  }
  intChart(report) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Most PopularTraining'
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
    this.popular_training_view();
  }
}
