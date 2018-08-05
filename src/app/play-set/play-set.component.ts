import { Component, OnInit, OnDestroy } from '@angular/core';
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
    currSet = {
          setId: 5,
          name: "It's Cold",
          loc1Id: 88,
          loc2Id: 89,
          loc3Id: 90,
          loc4Id: 0,
          loc5Id: 0,
          authorId: 5,
          rating: 0,
          totalRating: 0,
          totalRated: 0,
          highscore: 0
    };
    localStorage.setItem('set', JSON.stringify(currSet));
    console.log('set array length is ' + setArray.length);
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
    console.log(nextLoc.latitude + ' lng = ' + nextLoc.longitude);
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
    console.log(dist);
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
        console.log(setArray.length + 'bottom sheet close works' + count);
        if (count + 1 < setArray.length) {
          this.created = false;
          this.getLocation(setArray[count += 1]);
        } else {
          if (setScore > currSet.highscore) {
            currSet.highscore = setScore;
            this.locService.saveSet(currSet).subscribe(response => {
              if (response.status === 202) {
                localStorage.clear();
                localStorage.setItem('set', JSON.stringify(response.body));
                loggedUser = JSON.parse(localStorage.getItem('set'));
              } else {
                console.log(`Unable to update user`);
              }});
            alert('you broke the Highscore!');
          }
          alert('you reached the end of the set');
        }
      });
  }

  public getLocation (value: number) {
      this.locService.getLocation(value).subscribe(response => {
        if (response.status === 200) {
          nextLoc = response.body;
          console.log('got location ' + nextLoc);
            this.makeMaps();
        }
      });
  }

  public getSet() {
    currSet = JSON.parse(localStorage.getItem('set'));
    const locArray = [currSet.loc1Id, currSet.loc2Id, currSet.loc3Id, currSet.loc4Id, currSet.loc5Id];
    locArray.forEach((value, index) => {
      if (value !== 0) {
        setArray.push(value);
      }
    });
    console.log('current set ' + setArray);
  }

  public updateScore() {
    loggedUser = JSON.parse(localStorage.getItem('user'));
    loggedUser.high_Score = loggedUser.high_Score + score;
    if (score > 1000) {
      loggedUser.coins = loggedUser.coins += 1;
    }
    this.userService.updateUser(loggedUser).subscribe(response => {
      if (response.status === 202) {
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(response.body));
        loggedUser = JSON.parse(localStorage.getItem('user'));
      } else {
        console.log(`Unable to update user`);
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
  constructor(private bottomSheetRef: MatBottomSheetRef<PlaySetBottomSheetComponent>, private router: Router) {}

  nextLocation () {
    console.log('---------------------nav to net location------------');
    open = false;
    this.bottomSheetRef.dismiss();
  }
}
