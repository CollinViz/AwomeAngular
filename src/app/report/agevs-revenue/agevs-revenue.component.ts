import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
import {Report2Excel} from '../exportExcel'
@Component({
  selector: 'app-agevs-revenue',
  templateUrl: './agevs-revenue.component.html',
  styles: []
})
export class AgevsRevenueComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;
  reportData:any={};

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.female_male_view();
  }
  female_male_view(SearchObject:any) {
    this.Ewep.female_male_view(SearchObject).subscribe(report => {
      this.intChart(report); 
    });
  }
  intChart(report) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Female Owners Vs Male Owners'
      },
      xAxis: {
        categories: report.NameXrow
        //categories: report.DataSeries
      },
      series: report.DataSeries,
      //series: report.NameXrow,
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
    this.female_male_view(SearchObj);
  }
  exportExcel(){
    let ex = new Report2Excel()
    ex.createExcel(this.reportData.NameXrow,this.reportData.DataSeries);
  }
}
