import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../user.service';
import { User } from '../models/user';

export interface UserScore {
  username: String;
  highscore: Number;
}

let rowClicked;

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: MatTableDataSource<UserScore>;

  userScoreArr: UserScore[] = [];

  switched = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private bottomSheet: MatBottomSheet) {

    this.userService.getAllUsers().subscribe(response => {
      if (response.status >= 200 && 300) {
        this.dataSource = new MatTableDataSource(this.getHighUserScores(response.body));
      } else {
      }
    });
  }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(LeaderBoardBottomSheetComponent);
  }

  ngOnInit() {
  }

  getHighUserScores(allUsers: User[]) {
    let i;
    for (i = 0; i < allUsers.length; i++) {
      this.userScoreArr[i] = { username: allUsers[i].username, highscore: allUsers[i].highScore };
    }
    return sortByScore(this.userScoreArr).reverse();
  }

  ngDoCheck() {
    if (this.dataSource !== undefined && !this.switched) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.switched = true;
    }
  }
}

@Component({
  selector: 'app-leader-board-bottom-sheet',
  templateUrl: './leader-board-bottom-sheet.component.html',
})
export class LeaderBoardBottomSheetComponent {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: UserScore[] = [{ username: rowClicked.username, highscore: rowClicked.highscore }];

  constructor(private userService: UserService, private bottomSheetRef: MatBottomSheetRef<LeaderBoardBottomSheetComponent>) { }

  challengeUser() {
    const subject = `You've been challenged!`;
    const body = `${JSON.parse(localStorage.getItem('user')).username} is laughing at your score!
    Come play revLocate and claim your spot on top of the leader board! \n\nThe revLocate Team`;
    this.userService.sendEmail([rowClicked.username], body, subject).subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        this.bottomSheetRef.dismiss();
      } else {
      }
    });
  }

  addFriend() {
    this.userService.addFriend(JSON.parse(localStorage.getItem('user')), rowClicked.username).subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        this.bottomSheetRef.dismiss();
      } else {
      }
    });
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
