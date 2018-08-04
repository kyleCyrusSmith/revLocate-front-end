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

/*
  Request all set data from the db, make a sub-set array that has 3 sets that correspond
  to the page index, then use interpolation to display the set on the cards (pageEvent.pageIndex)
*/

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit {
  // MatPaginator Inputs
  length = 100; // Make call to server to get number of sets
  pageSize = 3;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(row): void {
    setClicked = row;
    console.log(row);
    this.bottomSheet.open(GameLobbyBottomSheetComponent);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-game-lobby-bottom-sheet',
  templateUrl: './game-lobby-bottom-sheet.component.html',
})
export class GameLobbyBottomSheetComponent {

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource: LocationSet = { setName: setClicked.setName, rating: setClicked.rating, highscore: setClicked.highscore };

  constructor(private bottomSheetRef: MatBottomSheetRef<GameLobbyBottomSheetComponent>, private router: Router) { }

  playSet() {
    console.log(`play set`);
    this.bottomSheetRef.dismiss();
    this.router.navigate(['play']);
    /* add a link to start a solo game of this set
    */
  }

}
