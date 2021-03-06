import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isValid = true;
  loggedUser = localStorage.getItem('user');

  hidePassword = true;
  hideConfirmPassword = true;

  user: User = new User();

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
    if (this.loggedUser != null) {
      this.router.navigate(['home']);
    }
  }

  register() {
    if (this.usernameFormControl.hasError('required') || this.passwordFormControl.hasError('required') ||
      this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') ||
      this.confirmPasswordFormControl.hasError('required')) {
      this.isValid = false;
      this.router.navigate(['register']);
    } else {
      this.userService.registerUser(this.user).subscribe(response => {
        if (response.status === 202) {
          this.isValid = true;
          this.router.navigate(['login']);
        } else {
          this.isValid = false;
        }
      });
    }
  }

}
