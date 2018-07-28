import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

export interface UserScore {
  username: String;
  highscore: Number;
}

const DUMMY_USER_SCORE_DATA: UserScore[] = [
  {username: 'Testuser', highscore: 1079},
  {username: 'Someuser', highscore: 355},
  {username: 'Dummyuser', highscore: 479},
  {username: 'Newuser', highscore: 108},
  {username: 'Olduser', highscore: 155},
];

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  displayedColumns: string[] = ['username', 'highscore'];
  dataSource = DUMMY_USER_SCORE_DATA;

  constructor() { }

  ngOnInit() {
  }

}
