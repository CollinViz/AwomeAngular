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
    this.owners_employees_view();
  }
  owners_employees_view() {
    this.Ewep.owners_employees_view(this.SelectedProvince).subscribe(report => {
      this.intChart(report); 
    });
  }
  intChart(report) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Owner Number Vs Employee Numbers'
      },
      xAxis: {
        categories:report.NameXrow
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
    this.owners_employees_view();
  }

}
