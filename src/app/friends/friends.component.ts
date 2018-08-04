import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

export interface UserScore {
  username: String;
  highscore: Number;
}

const DUMMY_USER_SCORE_DATA: UserScore[] = [
  { username: 'Testuser', highscore: 1079 },
  { username: 'Someuser', highscore: 355 },
  { username: 'Dummyuser', highscore: 479 },
  { username: 'Newuser', highscore: 108 },
  { username: 'Olduser', highscore: 155 },
];

let rowClicked;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource = sortByScore(DUMMY_USER_SCORE_DATA).reverse();

  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(FriendsBottomSheetComponent);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-friends-bottom-sheet',
  templateUrl: './friends-bottom-sheet.component.html',
})
export class FriendsBottomSheetComponent {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: UserScore[] = [{ username: rowClicked.username, highscore: rowClicked.highscore }];

  constructor(private bottomSheetRef: MatBottomSheetRef<FriendsBottomSheetComponent>) {}

  challengeUser() {
    console.log(`challenge user`);
    this.bottomSheetRef.dismiss();
    /* add a link to start a solo game that compares final scores
    */
  }

  removeFriend() {
    console.log(`remove friend`);
    this.bottomSheetRef.dismiss();
    /* add function to userService to add friend
    */
  }

}

function sortByScore(scoreArray: UserScore[]): UserScore[] {
  return scoreArray.sort(function (a, b) {
    const x = a.highscore;
    const y = b.highscore;
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
}
