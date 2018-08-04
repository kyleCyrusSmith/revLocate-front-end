import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { } from '@types/google-maps';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

let theDistance: number;
let points: number;
let score: number;
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
  polyCreated = false;
  marker;
  lat: number;
  lng: number;
  lat2: number;
  lng2: number;
  distance: number;
  polyLineList;
  polyLine: google.maps.Polyline;


  constructor(private router: Router, private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(PlayBottomSheetComponent);
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
    });
  }

  public placeMarker2 (location) {
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
    this.polyLineList = [{ lat: this.lat, lng: this.lng }, { lat: this.lat2, lng: this.lng2 }];
    if (this.polyCreated) {
      this.polyLine.setPath(this.polyLineList);
    } else {
      this.polyCreated = true;
      this.polyLine = new google.maps.Polyline({
        path: this.polyLineList,
        geodesic: false,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    }
    this.polyLine.setMap(this.map);
  }

  public flipMaps () {
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('floatMap'), {
        position: { lat: 42.345573, lng: -71.098326 },
        addressControl: false,
        linksControl: true,
        panControl: false,
        enableCloseButton: false
      });
    this.lat2 = this.panorama.getPosition().lat();
    this.lng2 = this.panorama.getPosition().lng();
    this.map = new google.maps.Map(
      document.getElementById('panorama'), {
        center: this.map.getCenter(),
        zoom: this.map.getZoom(),
        streetViewControl: false,
        clickableIcons: false,
        mapTypeControl: false,
        zoomControl: false
      });
  }

  public showMarkers () {
      this.created = true;
      this.marker = new google.maps.Marker({
        position: this.marker.getPosition(),
        map: this.map,
        draggable: false
      });
      const marker2 = new google.maps.Marker({
        position: this.panorama.getPosition(),
        map: this.map,
        draggable: false
      });
      const markers = [this.marker, marker2];
      const bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
      }

      this.map.fitBounds(bounds);
  }

  public calcScore() {
    const R = 6371e3;
    const calc: number = R * .4;
    console.log(calc);
    const dist = theDistance * 1000;
    console.log(dist);
    if (dist <= calc) {
      console.log(dist / calc);
      points = 100 - (dist / calc) * 100;
      console.log(points);
    } else {
      points = 0;
    }
  }

  public submitAns () {
    this.lat = this.marker.getPosition().lat();
    this.lng = this.marker.getPosition().lng();
    theDistance = this.calcDistance(this.lat, this.lng, this.lat2, this.lng2);
    this.flipMaps();
    this.polyLines();
    this.showMarkers();
    this.calcScore();
    this.bottomSheet.open(PlayBottomSheetComponent);
  }
}
@Component({
  selector: 'app-play-bottom-sheet',
  templateUrl: './play-bottom-sheet.component.html',
})
export class PlayBottomSheetComponent {
  theDistance = Math.round(theDistance);
  points = points;
  score = Math.round((points / 100) * 2000);
  constructor(private bottomSheetRef: MatBottomSheetRef<PlayBottomSheetComponent>) {}

  challengeUser() {
    console.log(theDistance);
    console.log(`challenge user`);
    this.bottomSheetRef.dismiss();
    window.location.reload();
    /* add a link to start a solo game that compares final scores
    */
  }

  addFriend() {
    console.log(`add friend`);
    this.bottomSheetRef.dismiss();
    /* add function to userService to add friend
    */
  }

}
