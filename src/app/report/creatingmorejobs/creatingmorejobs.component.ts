import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-creatingmorejobs',
  templateUrl: './creatingmorejobs.component.html',
  styles: []
})
export class CreatingmorejobsComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    this.income_expense_view();
  }
  income_expense_view() {
    this.Ewep.getincome_expense_view(this.SelectedProvince).subscribe(report => {
      this.intChart(report);
      report.DataSeries.forEach(element => {
        this.chart.addSerie(element);
      });
    });
  }
  intChart(report) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Income Expense'
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
    this.income_expense_view();
  }

}
