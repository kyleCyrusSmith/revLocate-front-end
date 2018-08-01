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
  loggedUser = localStorage.getItem('user');

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
      this.router.navigate(['home']);
    } else {
      this.loggedUser = JSON.parse(this.loggedUser);
    }
  }

  updateProfile() {
    if (this.usernameFormControl.hasError('required') || this.passwordFormControl.hasError('required') ||
      this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') ||
      this.confirmPasswordFormControl.hasError('required')) {
      console.log(`profile is missing fields`);
      this.isValid = false;
//      this.router.navigate(['profile']);
      }/* else {
      this.userService.updateUser(this.user).subscribe(response => {
        console.log(`response status from profile component: ` + response.status);
        if (response.status === 202) {
          this.isValid = true;
          console.log(`User, ${this.user.username}, successfully updated!`);
          localStorage.clear();
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['home']);
        } else {
          console.log(`Unable to update user`);
          this.isValid = false;
        }
      });
    } */
  }
}
