import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loggedUser = localStorage.getItem('user');
  isValid = true;

  hide = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.loggedUser != null) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.userService.loginUser(this.user).subscribe(response => {
      console.log(`response status from login component: ` + response.status);
      if (response.status === 200) {
        this.isValid = true;
        localStorage.setItem('user', JSON.stringify(response.body));
        console.log(`User, ${response.body.username}, successfully logged in!`);
        console.log(`local storage user: ` + localStorage.getItem('user'));
        this.router.navigate(['home']);
      } else {
        this.isValid = false;
      }
    });
  }
}
