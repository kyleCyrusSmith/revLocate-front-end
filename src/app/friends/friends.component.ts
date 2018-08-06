import { Component, OnInit, ViewChild, DoCheck, OnDestroy } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../user.service';
import { Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { Router, NavigationEnd } from '@angular/router';

export interface UserScore {
  username: String;
  highscore: Number;
}

let rowClicked;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, DoCheck, OnDestroy {
  navigationSubscription;

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: MatTableDataSource<UserScore>;

  userScoreArr: UserScore[] = [];

  switched = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private bottomSheet: MatBottomSheet, private router: Router) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy() {
    this.getFriendsList();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  openBottomSheet(row): void {
    if (row === undefined) {
      rowClicked = { username: '', highscore: 0 };
    } else {
      rowClicked = row;
    }
    this.bottomSheet.open(FriendsBottomSheetComponent);
  }

  ngOnInit() {
    this.getFriendsList();
  }

  getFriendsList() {
    this.userService.getAllFriends(JSON.parse(localStorage.getItem('user'))).subscribe(response => {
      console.log(`response status from friends component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`all friends retrieved for user ${JSON.parse(localStorage.getItem('user')).username}`);
        this.dataSource = new MatTableDataSource(this.getUserScores(response.body));
      } else {
        console.log(`friends component did not retrieve all users`);
      }
    });
  }

  getUserScores(allUsers: User[]) {
    let i;
    if (allUsers != null) {
      for (i = 0; i < allUsers.length; i++) {
        this.userScoreArr[i] = { username: allUsers[i].username, highscore: allUsers[i].highScore };
      }
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

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource: UserScore[] = [{ username: rowClicked.username, highscore: rowClicked.highscore }];

  friend: User = new User;

  addingFriend = false;
  removingFriend = false;

  constructor(private userService: UserService, private bottomSheetRef: MatBottomSheetRef<FriendsBottomSheetComponent>,
    private router: Router) {
      if (rowClicked.username === '') {
        this.addingFriend = true;
      } else {
        this.removingFriend = true;
      }
  }

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
    this.refreshPage();
  }

  removeFriend() {
    console.log(`remove friend called`);

    this.userService.removeFriend(JSON.parse(localStorage.getItem('user')), rowClicked.username).subscribe(response => {
      console.log(`response status from add friend bottom sheet component: ` + response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(`User, ${rowClicked.username}, successfully removed as friend!`);
      } else {
        console.log(`Unable to remove friend`);
      }
    });
    this.refreshPage();
  }

  refreshPage() {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['friends']);
  }
}
