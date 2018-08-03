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
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource = sortByScore(DUMMY_USER_SCORE_DATA).reverse();

  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(LeaderBoardBottomSheetComponent);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-leader-board-bottom-sheet',
  templateUrl: './leader-board-bottom-sheet.component.html',
})
export class LeaderBoardBottomSheetComponent {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: UserScore[] = [{ username: rowClicked.username, highscore: rowClicked.highscore }];

  constructor(private bottomSheetRef: MatBottomSheetRef<LeaderBoardBottomSheetComponent>) {}

  challengeUser() {
    console.log(`challenge user`);
    this.bottomSheetRef.dismiss();
    /* add a link to start a solo game that compares final scores
    */
  }

  addFriend() {
    console.log(`add friend`);
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
