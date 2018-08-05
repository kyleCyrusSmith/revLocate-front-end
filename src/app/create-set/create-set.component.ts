import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { } from '@types/google-maps';
import { LocationService } from '../location.service';
import { Location } from '../models/location';
import { Set } from '../models/set';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  lat: number;
  lng: number;
  userSet: Set = new Set;
  locCount = 0;

  constructor(private locService: LocationService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.initialize();
    this.userSet.authorId = JSON.parse(localStorage.getItem('user')).userId;
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
      this.lat = panorama.getPosition().lat();
      this.lng = panorama.getPosition().lng();
    });
  }

  public saveLocation() {
    console.log(`in save location: ${this.lat}, ${this.lng}`);
    const newLoc: Location = new Location;
    newLoc.latitude = this.lat;
    newLoc.longitude = this.lng;
    newLoc.author = JSON.parse(localStorage.getItem('user')).userId;
    console.log(newLoc);

    this.locService.saveLocation(newLoc).subscribe(response => {
      console.log(`response status from create location component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`New location successfully created!`);
        switch (this.locCount) {
          case 0:
            this.userSet.loc1 = response.body.locationId;
            break;
          case 1:
            this.userSet.loc2 = response.body.locationId;
            break;
          case 2:
            this.userSet.loc3 = response.body.locationId;
            this.userSet.loc4 = 0;
            this.userSet.loc5 = 0;
            this.saveSet();
            break;
          default:
            break;
        }
        this.locCount++;
      } else {
        console.log(`Location creation failed. Status code: ${response.status}`);
      }
    });
  }

  public saveSet() {
    console.log(`In save set with newSet: ${this.userSet}`);
    this.locService.tempSet = this.userSet;
    this.bottomSheet.open(CreateSetBottomSheetComponent);
  }
}

@Component({
  selector: 'app-create-set-bottom-sheet',
  templateUrl: './create-set-bottom-sheet.component.html',
})
export class CreateSetBottomSheetComponent {

  userSet: Set = this.locService.tempSet;
  constructor(private router: Router, private locService: LocationService,
    private bottomSheetRef: MatBottomSheetRef<CreateSetBottomSheetComponent>) { }

  setNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  submitSet() {
    if (this.setNameFormControl.hasError('required')) {
      console.log(`submit sheet is missing fields`);
    } else {
      console.log(`submit set: ${this.userSet}`);

    this.locService.saveSet(this.userSet).subscribe(response => {
      console.log(`response status from create set component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`New set successfully created!`);
      this.bottomSheetRef.dismiss();
      this.router.navigate(['home']);
      } else {
        console.log(`Location creation failed. Status code: ${response.status}`);
        this.router.navigate(['home']);
      }
    });
  }
    }

}

