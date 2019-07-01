import { Component, OnInit } from '@angular/core';
import { EwepserverService } from '../../ewepserver.service';
import { Chart } from 'angular-highcharts';
//const Excel = require('exceljs/modern.nodejs');
import {Report2Excel} from '../exportExcel'

@Component({
  selector: 'app-entrepreneur-challenges',
  templateUrl: './entrepreneur-challenges.component.html',
  styleUrls: ['./entrepreneur-challenges.component.css']
})
export class EntrepreneurChallengesComponent implements OnInit {

  SelectedProvince: string = "";
  SelectedAge: string = ""; 
  SelectedRace: string = ""; 
  SelectedSex: string = "";
  chart: Chart;
  reportData:any={};
  constructor(private Ewep: EwepserverService) { }

  ngOnInit() {
   // this.challenges_view();
  }
  challenges_view(SearchObject:any) {
    this.Ewep.challenges_view(SearchObject).subscribe(report => {
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
        text: 'Entrepreneur Challenges'
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
    console.log("Earch clieck",SearchObj);
    
    this.challenges_view(SearchObj);
  }
  exportExcel(){
    let ex = new Report2Excel()
    ex.createExcel(this.reportData.NameXrow,this.reportData.DataSeries);
  }

}
