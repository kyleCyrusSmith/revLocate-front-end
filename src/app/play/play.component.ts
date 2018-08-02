import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public initPano() {
    // Note: constructed panorama objects have visible: true
    // set by default.
    console.log('got here');

    let panorama = new google.maps.StreetViewPanorama(
        document.getElementById('map'), {
          position: {lat: 42.345573, lng: -71.098326},
          addressControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER
          },
          linksControl: false,
          panControl: false,
          enableCloseButton: false
    });
    console.log('got here 2');
  }

  public loadPano() {
    let call = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA6IlYJER0nN4F9sCiOaaMPfjZndEsj0l0&callback=';
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var mapProp = {
      center: new google.maps.LatLng(18, 74),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
