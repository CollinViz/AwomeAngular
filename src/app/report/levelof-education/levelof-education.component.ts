import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
import {Report2Excel} from '../exportExcel'

@Component({
  selector: 'app-levelof-education',
  templateUrl: './levelof-education.component.html',
  styles: []
})
export class LevelofEducationComponent implements OnInit {

  SelectedProvince: string = "";
  chart: Chart;
  reportData:any={};

  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
    //this.education_level_view();
  }
  education_level_view(SearchObject:any) {
    this.Ewep.education_level_view(SearchObject).subscribe(report => {
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
  SearchClick(SearchObj:any) {
    //this.SelectedProvince = Province;
    this.education_level_view(SearchObj);
  }
  exportExcel(){
    let ex = new Report2Excel()
    ex.createExcel(this.reportData.NameXrow,this.reportData.DataSeries);
  }
}
