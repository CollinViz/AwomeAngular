import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { EwepserverService, Province } from '../../../ewepserver.service'

@Component({
  selector: 'app-search-entrepreneur',
  templateUrl: './search-entrepreneur.component.html',
  styles: []
})
export class SearchEntrepreneurComponent implements OnInit {
  search = { Name: "", Surname: "", Province: "Select", HiHRep: "Select", Sector: "Select" }
  HeadingInfo: string = "Baseline Info"; 
  @Input() Heading?: string = "";
  @Input() hidAdd?: boolean = false;
  @Output() filter: string = "";
  @Output() SearchClick = new EventEmitter<string>();
  @Output() NewClick = new EventEmitter<string>();
  constructor(private EwepserverService: EwepserverService) {
     
  }

  ngOnInit() {
     
    if (this.Heading == "") {
      this.Heading = this.HeadingInfo;
    }

  }
  addClick() {
    this.NewClick.emit("add");
  }
  searchClickint() {
    let aFilter: string[] = [];
    if (this.search.Name != "") {
      aFilter.push("filter1=Name,cs," + this.search.Name);
      //aFilter.push("filter2=Surname,cs," + this.search.Name);
    }

    if (this.search.Surname != "") {
      //aFilter.push("filter1=Name,cs," + this.search.Name);
      aFilter.push("filter2=Surname,cs," + this.search.Surname);
    }
 

    this.filter = aFilter.join("&");
    this.SearchClick.emit(this.filter);

  }
}
