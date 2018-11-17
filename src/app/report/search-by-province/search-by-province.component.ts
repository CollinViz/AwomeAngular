import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EwepserverService } from '../../ewepserver.service';


@Component({
  selector: 'app-search-by-province',
  templateUrl: './search-by-province.component.html',
  styles: []
})
export class SearchByProvinceComponent implements OnInit {

  search = { Name: "", Year_Established: "", Province: "Select", Legal_Structure: "Select", HiHRep: "Select", Sector: "Select" };
  Provinces = [];
  ActiveEDFs = [];
  @Output() SearchClick = new EventEmitter<string>();
  @Input() Heading?: string = "";

  HeadingInfo: string = "Report";

  constructor(private Ewep: EwepserverService) {

    this.Provinces = this.Ewep.province;

    Ewep.getActiveEDF().subscribe((efflist: any) => {
      this.ActiveEDFs = efflist.records;
    });
  }

  ngOnInit() {

    if (this.Heading === "") {
      this.Heading = this.HeadingInfo;
    }

  }
  searchClickint() {
    if (this.search.Province === "Select") {
      this.SearchClick.emit('');
      return;
    }
    this.SearchClick.emit(this.search.Province);
  }

}
