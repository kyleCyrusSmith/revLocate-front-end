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
  { username: 'Testuser', highscore: 1079 },
  { username: 'Someuser', highscore: 355 },
  { username: 'Dummyuser', highscore: 479 },
  { username: 'Newuser', highscore: 108 },
  { username: 'Olduser', highscore: 155 },
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
export class FriendsComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: MatTableDataSource<UserScore>;

  userScoreArr: UserScore[] = [];

  switched = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private bottomSheet: MatBottomSheet) {

    this.userService.getAllFriends(JSON.parse(localStorage.getItem('user'))).subscribe(response => {
      console.log(`response status from friends component: ` + response.status);
      if (response.status >= 200 && 300) {
        console.log(`all friends retrieved for user ${JSON.parse(localStorage.getItem('user')).username}`);
        this.dataSource = new MatTableDataSource(this.getUserScores(response.body));
      } else {
        console.log(`friends component did not retrieve all users`);
      }
    });
  }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(FriendsBottomSheetComponent);
  }

  ngOnInit() {
  }

  getUserScores(allUsers: User[]) {
    let i;
    for (i = 0; i < allUsers.length; i++) {
      this.userScoreArr[i] = { username: allUsers[i].username, highscore: allUsers[i].high_Score };
    }
    return this.userScoreArr;
  }

  ngDoCheck() {
    if (this.dataSource !== undefined && !this.switched) {
      console.log(`hey from friends component`);
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
  selector: 'app-friends-bottom-sheet',
  templateUrl: './friends-bottom-sheet.component.html',
})
export class FriendsBottomSheetComponent {

  friend: User = new User;

  constructor(private userService: UserService, private bottomSheetRef: MatBottomSheetRef<FriendsBottomSheetComponent>) { }

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  addFriend() {
    console.log(`add friend called`);

    if (this.usernameFormControl.hasError('required')) {
      console.log(`add friend sheet is missing fields`);
    } else {
      this.userService.addFriend(JSON.parse(localStorage.getItem('user')), this.friend.username).subscribe(response => {
        console.log(`response status from add friend bottom sheet component: ` + response.status);
        if (response.status >= 200 && response.status < 300) {
          console.log(`User, ${this.friend.username}, successfully added as friend!`);
          this.bottomSheetRef.dismiss();
        } else {
          console.log(`Unable to add friend`);
        }
      });
    }
  }

  removeFriend() {
    console.log(`remove friend called`);

    this.userService.removeFriend(JSON.parse(localStorage.getItem('user')), rowClicked.username).subscribe(response => {
      console.log(`response status from add friend bottom sheet component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`User, ${rowClicked.username}, successfully removed as friend!`);
        this.bottomSheetRef.dismiss();
      } else {
        console.log(`Unable to remove friend`);
      }
    });
  }

}
