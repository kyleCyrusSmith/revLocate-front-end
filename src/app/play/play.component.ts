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
  panorama: google.maps.StreetViewPanorama;
  created = false;
  marker;
  lat: number;
  lng: number;
  lat2: number;
  lng2: number;
  distance: number;
  polyLineList;
  polyLine: google.maps.Polyline;


  constructor(private router: Router) {
  }

  ngOnInit () {
  }

  ngAfterViewInit () {
    this.makeMaps();
  }

  public makeMaps () {
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('panorama'), {
        position: { lat: 42.345573, lng: -71.098326 },
        addressControl: false,
        linksControl: true,
        panControl: false,
        enableCloseButton: false
      });
    this.lat2 = this.panorama.getPosition().lat();
    this.lng2 = this.panorama.getPosition().lng();
    console.log(this.lat2);
    console.log(this.lng2);
    this.map = new google.maps.Map(
      document.getElementById('floatMap'), {
        center: new google.maps.LatLng(0, 0),
        zoom: 0,
        streetViewControl: false,
        clickableIcons: false,
        mapTypeControl: false,
        zoomControl: false
      });
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.placeMarker2(event.latLng);
      console.log(this.lat + ' ' + this.lng);
      this.polyLines();
    });

  }

  public placeMarker2 (location) {
    console.log('this creadted = ' + this.created);
    if (this.created) {
      this.marker.setPosition(location);
    } else {
      this.created = true;
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        draggable: true
      });
    }
    this.map.setCenter(this.marker.getPosition());
    this.lat = this.marker.getPosition().lat();
    this.lng = this.marker.getPosition().lng();
    this.distance = this.calcDistance(this.lat, this.lng, this.lat2, this.lng2);
    console.log(this.distance);
  }
  public calcDistance (lat: number, lng: number, lat2: number, lng2: number): number {
    const R = 6371e3; // metres
    const φ1 = lat * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat) * Math.PI / 180;
    const Δλ = (lng2 - lng) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d / 1000;
  }

  public polyLines () {
    this.polyLineList = [{lat: this.lat, lng: this.lng}, {lat: this.lat2, lng: this.lng2}];
    this.polyLine = new google.maps.Polyline({
      path: this.polyLineList,
      geodesic: false,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.polyLine.setMap(this.map);
  }
}
