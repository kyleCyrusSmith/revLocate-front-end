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
  setId: Number;
  rating: Number;
  highscore: Number;
}

let rowClicked;

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit, DoCheck {

  displayedColumns: String[] = ['snapshot', 'setName', 'rating', 'highscore'];
  dataSource: MatTableDataSource<PopularSet>;

  popSetArr: PopularSet[] = [];
  locString: String;

  switched = false;
  locationsRetrieved = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private locService: LocationService, private bottomSheet: MatBottomSheet) {

    this.locService.getAllSets().subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        this.dataSource = new MatTableDataSource(this.getGameLobby(response.body));
      } else {
      }
    });
  }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(GameLobbyBottomSheetComponent);
  }

  ngOnInit() {
  }

  getGameLobby(allSets: Set[]) {
    let i;
    for (i = 0; i < allSets.length; i++) {
      this.popSetArr[i] = {
        location: '', locationId: allSets[i].loc1, setName: allSets[i].name, setId: allSets[i].setId,
        rating: allSets[i].rating, highscore: allSets[i].highScore
      };
    }
    this.popSetArr = this.getLocationString();
    return sortByRating(this.popSetArr).reverse();
  }

  getLocationString(): PopularSet[] {
    let i = 0, j = 0;
    for (i = 0; i < this.popSetArr.length; i++) {

      this.locService.getLocation(this.popSetArr[i].locationId).subscribe((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.locString = String(response.body.latitude) + ',' + String(response.body.longitude);
          this.popSetArr[j].location = this.locString;
          j++;
          if (j === (this.popSetArr.length)) {
            this.locationsRetrieved = true;
          }
        } else {
          this.locString = '42.35930583333334000,-71.16617388888892000';
        }
      });
    }
    return this.popSetArr;
  }

  ngDoCheck() {
    if (this.dataSource !== undefined && !this.switched && this.locationsRetrieved) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.switched = true;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

@Component({
  selector: 'app-game-lobby-bottom-sheet',
  templateUrl: './game-lobby-bottom-sheet.component.html',
})
export class GameLobbyBottomSheetComponent {

  displayedColumns: String[] = ['setName', 'rating', 'highscore'];
  dataSource: PopularSet[] = [{
    location: 'test', locationId: 0,
    setName: rowClicked.setName, setId: rowClicked.setId, rating: rowClicked.rating, highscore: rowClicked.highscore
  }];

  constructor(private locService: LocationService, private bottomSheetRef: MatBottomSheetRef<GameLobbyBottomSheetComponent>,
    private router: Router) { }

  playSet() {
    this.bottomSheetRef.dismiss();
    this.locService.getSet(this.dataSource[0].setId).subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('set', JSON.stringify(response.body));
        this.router.navigate(['play-set']);
      } else {
      }
    });
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
