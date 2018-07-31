import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
