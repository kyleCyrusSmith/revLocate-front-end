import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  loggedIn: boolean = (localStorage.getItem('user') !== null) ? true : false;
  totalScore = 0;
  revCoins = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngDoCheck() {
    this.loggedIn = (localStorage.getItem('user') !== null) ? true : false;
    if (this.loggedIn) {
      this.totalScore = (JSON.parse(localStorage.getItem('user')).high_Score);
      this.revCoins = (JSON.parse(localStorage.getItem('user')).coins);
    }
  }

}
