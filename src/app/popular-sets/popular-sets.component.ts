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
  selector: 'app-popular-sets',
  templateUrl: './popular-sets.component.html',
  styleUrls: ['./popular-sets.component.css']
})
export class PopularSetsComponent implements OnInit, DoCheck {

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
        this.dataSource = new MatTableDataSource(this.getPopularSets(response.body));
      } else {
        console.log(`popular set board did not retrieve all sets`);
      }
    });
  }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(PopularSetBottomSheetComponent);
  }

  ngOnInit() {
  }

  getPopularSets(allSets: Set[]) {
    let i;
    for (i = 0; i < allSets.length; i++) {
      this.popSetArr[i] = { setName: allSets[i].name, rating: allSets[i].rating, highscore: allSets[i].highScore };
    }
    return this.popSetArr;
    //   return sortByScore(this.popSetArr).reverse().slice(0, 5);
  }

  ngDoCheck() {
    if (this.dataSource !== undefined && !this.switched) {
      console.log(`hey in pop set`);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.switched = true;
    }
  }

}

@Component({
  selector: 'app-popular-sets-bottom-sheet',
  templateUrl: './popular-sets-bottom-sheet.component.html',
})
export class PopularSetBottomSheetComponent {

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource: PopularSet[] = [{ setName: rowClicked.setName, rating: rowClicked.rating, highscore: rowClicked.highscore }];

  constructor(private bottomSheetRef: MatBottomSheetRef<PopularSetBottomSheetComponent>, private router: Router) { }

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
