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
  CountryID;
  ActiveEDFs = [];
  @Output() SearchClick = new EventEmitter<string>();
  @Input() Heading?: string = "";
  @Input() ProvinceLabel?: string = "";

  HeadingInfo: string = "Report";

  constructor(private Ewep: EwepserverService) {
    this.CountryID = this.Ewep.SelectedCountryID;
    if (this.CountryID == 1){
    this.Provinces = this.Ewep.province;
  }
  else{
    this.Provinces = this.Ewep.districtMetro;
  }
    
console.log("the country is: ", this.CountryID);
    Ewep.getActiveEDF().subscribe((efflist: any) => {
      this.ActiveEDFs = efflist.records;
    });
  }

  ngOnInit() {

    if (this.Heading === "") {
      this.Heading = this.HeadingInfo;
    }
    if (this.CountryID == 1){
      this.ProvinceLabel = "Province";
    }
    else{
      this.ProvinceLabel = "Region";
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
