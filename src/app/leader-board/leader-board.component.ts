import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource = sortByScore(DUMMY_USER_SCORE_DATA).reverse();

  constructor() { }

  ngOnInit() {
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
