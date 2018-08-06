import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isValid = true;
  loggedUser = JSON.parse(localStorage.getItem('user'));

  user: User = new User();

  hidePassword = true;
  hideConfirmPassword = true;

  confirmedPassword: String;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordsMatch(): Boolean {
    return this.confirmedPassword === this.user.password ? true : false;
  }

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.loggedUser == null) {
      this.router.navigate(['login']);
    } else {
      this.user.userId = this.loggedUser.userId;
    }
  }

  updateProfile() {
    if (this.usernameFormControl.hasError('required') || this.passwordFormControl.hasError('required') ||
      this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') ||
      this.confirmPasswordFormControl.hasError('required')) {
      this.isValid = false;
    } else {
      this.userService.updateUser(this.user).subscribe(response => {
        if (response.status === 202) {
          this.isValid = true;
          localStorage.clear();
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['home']);
        } else {
          this.isValid = false;
        }
      });
    }
  }
}
