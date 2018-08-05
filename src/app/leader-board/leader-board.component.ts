import { Component, OnInit, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../user.service';
import { Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';

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
export class LeaderBoardComponent implements OnInit/*, AfterViewInit*/, DoCheck  {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: MatTableDataSource<UserScore>;// = new MatTableDataSource;

  userScoreArr: UserScore[] = [];
  tempUser: UserScore = { username: '', highscore: 0 };

  switched = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private bottomSheet: MatBottomSheet) {
    //   this.dataSource = new MatTableDataSource(DUMMY_USER_SCORE_DATA);

    this.userService.getAllUsers().subscribe(response => {
      console.log(`response status from leader board component: ` + response.status);
      if (response.status >= 200 && 300) {
        console.log(`all users retrieved by leader board`);
        this.dataSource = new MatTableDataSource(this.getHighUserScores(response.body));
      } else {
        console.log(`leaderboard did not retrieve all users`);
      }
    });
  }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(LeaderBoardBottomSheetComponent);
  }

  ngOnInit() {
 //       this.paginator.pageSize = 5;
  }

  getHighUserScores(allUsers: User[]) {
    let i;
    for (i = 0; i < allUsers.length; i++) {
      this.tempUser.username = allUsers[i].username;
      this.tempUser.highscore = allUsers[i].high_Score;
      this.userScoreArr[i] = { username: allUsers[i].username, highscore: allUsers[i].high_Score };
    }
    return this.userScoreArr;
 //   return sortByScore(this.userScoreArr).reverse().slice(0, 5);
  }
 /* 
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
*/
    ngDoCheck() {
      if (this.dataSource !== undefined && !this.switched) {
      console.log(`hey`);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.switched = true;
      }
    }
/*

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  */
}

@Component({
  selector: 'app-leader-board-bottom-sheet',
  templateUrl: './leader-board-bottom-sheet.component.html',
})
export class LeaderBoardBottomSheetComponent {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: UserScore[] = [{ username: rowClicked.username, highscore: rowClicked.highscore }];

  constructor(private bottomSheetRef: MatBottomSheetRef<LeaderBoardBottomSheetComponent>) { }

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
