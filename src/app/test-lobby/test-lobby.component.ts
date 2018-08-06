/*
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

export interface LocationSet {
  setName: String;
  rating: Number;
  highscore: Number;
}

let setClicked;

@Component({
  selector: 'app-test-lobby',
  templateUrl: './test-lobby.component.html',
  styleUrls: ['./test-lobby.component.css']
})
export class TestLobbyComponent implements OnInit {
  // MatPaginator Inputs
  length = 100; // Make call to server to get Number of sets
  pageSize = 3;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(row): void {
    setClicked = row;
    console.log(row);
    this.bottomSheet.open(TestLobbyBottomSheetComponent);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-test-lobby-bottom-sheet',
  templateUrl: './test-lobby-bottom-sheet.component.html',
})
export class TestLobbyBottomSheetComponent {

  displayedColumns: String[] = ['setName', 'rating', 'highscore'];
  dataSource: LocationSet = { setName: setClicked.setName, rating: setClicked.rating, highscore: setClicked.highscore };

  constructor(private bottomSheetRef: MatBottomSheetRef<TestLobbyBottomSheetComponent>, private router: Router) { }

  playSet() {
    console.log(`play set`);
    this.bottomSheetRef.dismiss();
    this.router.navigate(['play']);
    /* add a link to start a solo Test of this set
    *-/
  }

}
*/


import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LocationService } from '../location.service';
import { Set } from '../models/set';

export interface PopularSet {
  location: String;
  locationId: Number;
  setName: String;
  rating: Number;
  highscore: Number;
}

let rowClicked;

@Component({
  selector: 'app-test-lobby',
  templateUrl: './test-lobby.component.html',
  styleUrls: ['./test-lobby.component.css']
})
export class TestLobbyComponent implements OnInit, DoCheck {

  displayedColumns: String[] = ['snapshot', 'setName', 'rating', 'highscore'];
  // displayedColumns: String[] = ['setName', 'rating', 'highscore'];
  dataSource: MatTableDataSource<PopularSet>;

  popSetArr: PopularSet[] = [];
  locString: String;
  testLocString = '42.35930583333334000,-71.16617388888892000';

  switched = false;
  locationsRetrieved = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private locService: LocationService, private bottomSheet: MatBottomSheet) {

    this.locService.getAllSets().subscribe(response => {
      console.log(`response status from popular sets component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`all sets retrieved by popular set component`);
        this.dataSource = new MatTableDataSource(this.getTestLobby(response.body));
      } else {
        console.log(`popular set board did not retrieve all sets`);
      }
    });
  }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(TestLobbyBottomSheetComponent);
  }

  ngOnInit() {
  }

  getTestLobby(allSets: Set[]) {
    let i;
    for (i = 0; i < allSets.length; i++) {
      this.popSetArr[i] = {
        location: '', locationId: allSets[i].loc1, setName: allSets[i].name,
        rating: allSets[i].rating, highscore: allSets[i].highScore
      };
      console.log(this.popSetArr[i].location);
    }
    this.popSetArr = this.getLocationString();
    return sortByRating(this.popSetArr).reverse();
  }

  getLocationString(): PopularSet[] {
    let i = 0, j = 0;
    for (i = 0; i < this.popSetArr.length; i++) {

    this.locService.getLocation(this.popSetArr[i].locationId).subscribe((response) => {
      console.log(`response status from test lobby component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`location retrieved by test lobby component`);
        this.locString = String(response.body.latitude) + ',' + String(response.body.longitude);
        console.log(this.locString);
        console.log(`i: ${i}, j: ${j}, arrLength: ${this.popSetArr.length}`);
        this.popSetArr[j].location = this.locString;
        j++;
        if (j === (this.popSetArr.length)) {
          this.locationsRetrieved = true;
          console.log('LOCATIONSRETRIEVED set to true');
        }
      } else {
        console.log(`popular set board did not retrieve all sets`);
        this.locString = '42.35930583333334000,-71.16617388888892000';
      }
    });
  }
    console.log(`just before return ` + this.locString);
    return this.popSetArr;
  }

  ngDoCheck() {
    if (this.dataSource !== undefined && !this.switched && this.locationsRetrieved) {
      console.log(`hey in pop set`);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.switched = true;
      console.log(`in DoCheck. LacationsRetrived: ${this.locationsRetrieved}`);
      console.log(`LocString in doCheck ` + this.locString);
      console.log(`popsetarr location: ${this.popSetArr[2].location}`);
    }
  }

}

@Component({
  selector: 'app-test-lobby-bottom-sheet',
  templateUrl: './test-lobby-bottom-sheet.component.html',
})
export class TestLobbyBottomSheetComponent {

  displayedColumns: String[] = ['snapshot', 'setName', 'rating', 'highscore'];
  // displayedColumns: String[] = ['setName', 'rating', 'highscore'];
  dataSource: PopularSet[] = [{
    location: 'test', locationId: 0,
    setName: rowClicked.setName, rating: rowClicked.rating, highscore: rowClicked.highscore
  }];

  constructor(private bottomSheetRef: MatBottomSheetRef<TestLobbyBottomSheetComponent>, private router: Router) { }

  playSet() {
    console.log(`play set`);
    this.bottomSheetRef.dismiss();
    this.router.navigate(['play']);
    /* add a link to start a solo game of this set
    */
  }

}

function sortByRating(ratingArray: PopularSet[]): PopularSet[] {
  return ratingArray.sort(function (a, b) {
    const x = a.rating;
    const y = b.rating;
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
}
