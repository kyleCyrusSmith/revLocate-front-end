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
    this.userService.registerUser(this.user).subscribe(users => {
      if (users == null) {
        this.isValid = !this.isValid;
      } else {
        this.userService.subscribers.next(users);
        console.log(`User, ${this.user.username}, successfully registered!`);
        this.router.navigate(['login']);
      }
    });
  }

}
