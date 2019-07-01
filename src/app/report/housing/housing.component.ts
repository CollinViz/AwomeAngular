import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
import {Report2Excel} from '../exportExcel'
@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styles: []
})
export class HousingComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;
  reportData:any={};

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.premise_ownership_view();
  }
  premise_ownership_view(SearchObject:any) {
    this.Ewep.getpremise_ownership_view(SearchObject).subscribe(report => {
      this.intChart(report); 
    });
  }
  intChart(report) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Premise Ownership'
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
    this.premise_ownership_view(SearchObj);
  }
  exportExcel(){
    let ex = new Report2Excel()
    ex.createExcel(this.reportData.NameXrow,this.reportData.DataSeries);
  }
}
