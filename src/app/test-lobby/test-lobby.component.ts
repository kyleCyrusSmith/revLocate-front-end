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
  length = 100; // Make call to server to get number of sets
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

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
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

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource: MatTableDataSource<PopularSet>;

  popSetArr: PopularSet[] = [];

  switched = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private locService: LocationService, private bottomSheet: MatBottomSheet) {

    this.locService.getAllSets().subscribe(response => {
      console.log(`response status from popular sets component: ` + response.status);
      if (response.status >= 200 && 300) {
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
      this.popSetArr[i] = { setName: allSets[i].name, rating: allSets[i].rating, highscore: allSets[i].highScore };
    }
    return sortByRating(this.popSetArr).reverse();
  }

  ngDoCheck() {
    if (this.dataSource !== undefined && !this.switched) {
      console.log(`hey in pop set`);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
 //     this.dataSource.
      this.switched = true;
    }
  }

}

@Component({
  selector: 'app-test-lobby-bottom-sheet',
  templateUrl: './test-lobby-bottom-sheet.component.html',
})
export class TestLobbyBottomSheetComponent {

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource: PopularSet[] = [{ setName: rowClicked.setName, rating: rowClicked.rating, highscore: rowClicked.highscore }];

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
