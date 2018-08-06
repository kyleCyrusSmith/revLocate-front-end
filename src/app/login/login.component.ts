import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loggedUser = localStorage.getItem('user');
  isValid = true;

  hidePassword = true;

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.loggedUser != null) {
      this.router.navigate(['home']);
    }
  }

  login() {

    if (this.usernameFormControl.hasError('required') || this.passwordFormControl.hasError('required')) {
      this.isValid = false;
    } else {
      this.userService.loginUser(this.user).subscribe(response => {
        if (response.status === 200) {
          this.isValid = true;
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['home']);
        } else {
          this.isValid = false;
        }
      });
    }
  }
}
