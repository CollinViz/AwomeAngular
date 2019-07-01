import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
import {Report2Excel} from '../exportExcel'
@Component({
  selector: 'app-owner-number-vs-employee-numbers',
  templateUrl: './owner-number-vs-employee-numbers.component.html',
  styles: []
})
export class OwnerNumberVsEmployeeNumbersComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;
  reportData:any={};

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.owners_employees_view();
  }
  owners_employees_view(SearchObject:any) {
    this.Ewep.owners_employees_view(SearchObject).subscribe(report => {
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
  SearchClick(SearchObj:any) {
    //this.SelectedProvince = Province;
    this.owners_employees_view(SearchObj);
  }
  exportExcel(){
    let ex = new Report2Excel()
    ex.createExcel(this.reportData.NameXrow,this.reportData.DataSeries);
  }
}
