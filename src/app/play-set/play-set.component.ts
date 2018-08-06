import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { } from '@types/google-maps';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { LocationService } from '../location.service';
import { Location } from '../models/location';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Set } from '../models/set';

let theDistance: number;
let points: number;
let score: number;
let nextLoc: Location = new Location;
let loggedUser: User;
let currSet: Set;
let setArray = [];
let locationArray = [];
let count = 0;
let open = true;
let setScore = 0;
let setRating = 0;
let next = true;
let endScreen = false;
@Component({
  selector: 'app-play-set',
  templateUrl: './play-set.component.html',
  styleUrls: ['./play-set.component.css']
})
export class PlaySetComponent implements OnInit, OnDestroy {
  navigationSubscription;
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

  constructor(private router: Router, private bottomSheet: MatBottomSheet, private userService: UserService,
    private locService: LocationService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialisePlaySet();
      }
    });
  }
  initialisePlaySet () {
    next = true;
    if (setArray.length === 0) {
      this.getSet();
      this.getLocation(setArray[count]);
    }
  }

  ngOnDestroy () {
    this.created = false;
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  openBottomSheet (): void {
    this.bottomSheet.open(PlaySetBottomSheetComponent);
  }

  ngOnInit () {
  }

  public makeMaps () {
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('panorama'), {
        position: { lat: nextLoc.latitude, lng: nextLoc.longitude },
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
    return d / 1000; // killometers
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
    this.lat2 = this.panorama.getPosition().lat();
    this.lng2 = this.panorama.getPosition().lng();
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('floatMap'), {
        position: { lat: nextLoc.latitude, lng: nextLoc.longitude },
        addressControl: false,
        linksControl: true,
        panControl: false,
        enableCloseButton: false
      });
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
      position: { lat: this.lat2, lng: this.lng2 },
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

  public calcScore () {
    const R = 6371e3;
    const calc: number = R * .4;
    const dist = theDistance * 1000;
    if (dist <= calc) {
      points = 100 - (dist / calc) * 100;
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
    if (points === 0) {
      score = 0;
    } else {
      score = Math.round((points / 100) * 2000);
    }
    this.updateScore();
    setScore += score;
    this.bottomSheet.open(PlaySetBottomSheetComponent);
    this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(
      (event) => {
        if (count + 1 < setArray.length) {
          this.created = false;
          this.getLocation(setArray[count += 1]);
        } else {
          next = false;
          endScreen = true;
          if (setScore > currSet.highScore) {
            currSet.highScore = setScore;
            this.locService.saveSet(currSet).subscribe(response => {
              if (response.status >= 200 && response.status < 300) {
                localStorage.removeItem('set');
                localStorage.setItem('set', JSON.stringify(response.body));
                loggedUser = JSON.parse(localStorage.getItem('set'));
              } else {
              }});
          }
          this.bottomSheet.open(PlaySetBottomSheetComponent);
          this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe( (event) => {
            setArray = [];
            currSet.totalRated += 1;
            currSet.totalRating += setScore;
            currSet.rating = currSet.totalRating / currSet.totalRated;
            this.locService.saveSet(currSet).subscribe(response => {
              console.log(response.status);
              if (response.status >= 200 && response.status < 300) {
                localStorage.removeItem('set');
                localStorage.setItem('set', JSON.stringify(response.body));
                loggedUser = JSON.parse(localStorage.getItem('set'));
              } else {
                console.log(`Unable to update user`);
              }});
              this.router.navigate(['lobby']);
            });
        }
      });
  }

  public getLocation (val: number) {
      this.locService.getLocation(val).subscribe(response => {
        if (response.status >= 200 && response.status < 300) {
          nextLoc = response.body;
            this.makeMaps();
        }
      });
  }

  public getSet() {
    currSet = JSON.parse(localStorage.getItem('set'));
    let locArray = [currSet.loc1, currSet.loc2, currSet.loc3, currSet.loc4, currSet.loc5];
    locArray.forEach((val, index) => {
      if (val !== 0) {
        setArray.push(val);
      }
    });
  }

  public updateScore() {
    loggedUser = JSON.parse(localStorage.getItem('user'));
    loggedUser.highScore = loggedUser.highScore + score;
    if (score > 1000) {
      loggedUser.coins = loggedUser.coins += 1;
    }
    this.userService.updateUser(loggedUser).subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        localStorage.removeItem('set');
        localStorage.setItem('user', JSON.stringify(response.body));
        loggedUser = JSON.parse(localStorage.getItem('user'));
      } else {
      }
    });
  }
}

@Component({
  selector: 'app-play-set-bottom-sheet',
  templateUrl: './play-set-bottom-sheet.component.html',
})
export class PlaySetBottomSheetComponent {
  theDistance = Math.round(theDistance);
  points = points;
  score = score;
  next = next;
  endScreen = endScreen;
  currSet = currSet;
  setScore = setScore;


  constructor(private bottomSheetRef: MatBottomSheetRef<PlaySetBottomSheetComponent>, private router: Router) {}

  nextLocation () {
    open = false;
    this.bottomSheetRef.dismiss();
  }

  endSet() {
    console.log(setScore);
    console.log(event.returnValue);
    this.bottomSheetRef.dismiss();
  }
  onChange(event: any) {
    console.log('changed ' + event.value);
    setScore = event.value;
  }
}
