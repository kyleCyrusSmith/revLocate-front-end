import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';
import { } from '@types/google-maps';
import { LocationService } from '../location.service';
import { Location } from '../models/location';

declare const google: any;

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit, AfterViewInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  lat: number;
  lng: number;

  constructor(private locService: LocationService) { }

  ngOnInit() {
    this.initialize();
  }

  ngAfterViewInit() {
  }

  public initialize() {
    const fenway = { lat: 42.345573, lng: -71.098326 };
    const map = new google.maps.Map(document.getElementById('map'), {
      center: fenway,
      zoom: 14
    });
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    map.setStreetView(panorama);

    panorama.addListener('position_changed', () => {
      console.log(`new position: (${panorama.getPosition().lat()}, ${panorama.getPosition().lng()})`);
      //      this.updateLatLng(panorama.getPosition().lat(), panorama.getPosition().lng());
      this.lat = panorama.getPosition().lat();
      this.lng = panorama.getPosition().lng();
    });
  }

  public saveLocation() {
    console.log(`in save location: ${this.lat}, ${this.lng}`);
    const newLoc: Location = new Location;
    newLoc.latitude = this.lat;
    newLoc.longitude = this.lng;
    newLoc.author = JSON.parse(localStorage.getItem('user')).username;
    console.log(newLoc);
    this.locService.saveLocation(newLoc);



    this.locService.saveLocation(newLoc).subscribe(response => {
      console.log(`response status from create location component: ` + response.status);
      if (response.status === 202) {
        console.log(`New location successfully created!`);
      } else {
        console.log(`Location creation failed. Status code: ${response.status}`);
      }
    });

  }
}
