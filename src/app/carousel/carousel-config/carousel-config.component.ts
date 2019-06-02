import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-carousel-config',
  templateUrl: './carousel-config.component.html',
  styleUrls: ['./carousel-config.component.css'],
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselConfig implements OnInit {

  @ViewChild('carousel') carousel: any;

  constructor(config: NgbCarouselConfig) { 
    config.interval = 5000;
    config.keyboard = false;
    
    
  }

  ngOnInit() {
  }

}
