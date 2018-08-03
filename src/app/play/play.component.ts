import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';
import { } from '@types/google-maps';
declare const google: any;

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;


  constructor(private router: Router) {
  }

  ngOnInit () {
  }

  ngAfterViewInit () {
    this.makeMaps();
  }

  public makeMaps () {
    let created = false;
    let marker;
    let lat: number;
    let lng: number;
    let lat2: number;
    let lng2: number;
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('panorama'), {
        position: { lat: 42.345573, lng: -71.098326 },
        addressControl: false,
        linksControl: true,
        panControl: false,
        enableCloseButton: false
      });
    lat2 = panorama.getPosition().lat();
    lng2 = panorama.getPosition().lng();
    console.log(lat2);
    console.log(lng2);
    let map = new google.maps.Map(
      document.getElementById('floatMap'), {
        center: new google.maps.LatLng(0, 0),
        zoom: 0,
        streetViewControl: false,
        clickableIcons: false,
        mapTypeControl: false,
        zoomControl: false
      });

    google.maps.event.addListener(map, 'click', function (event) {
      placeMarker(event.latLng);
      console.log(lat + ' ' + lng);
    });

    function placeMarker (location) {
      if (created) {
        marker.setPosition(location);
      } else {
        created = true;
        marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true
        });
      }
      map.setCenter(marker.getPosition());
      lat = marker.getPosition().lat();
      lng = marker.getPosition().lng();
      let distance = this.calcDistance(lat, lng, lat2, lng2);
      console.log(distance);
    }

  }
  public calcDistance(lat: number, lng: number, lat2: number, lng2: number): number {

    let R = 6371e3; // metres
    let φ1 = lat * Math.PI / 180;
    let φ2 = lat2 * Math.PI / 180;
    let Δφ = (lat2 - lat) * Math.PI / 180;
    let Δλ = (lng2 - lng) * Math.PI / 180;
    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }
}

// public placeMarker(location) {
//   if (this.created) {
//     this.marker.setPosition(location);
//   } else {
//     this.created = true;
//     this.marker = new google.maps.Marker({
//         position: location,
//         map: this.map,
//         draggable: true
//     });
//   }
//   this.lat = this.marker.getPosition().lat();
//   this.lng = this.marker.getPosition().lng();
// }
