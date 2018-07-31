import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

//  subscribers: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /*
    If a user JSON string already exists in the localStorage, take the user out,
    parse it into an object, then put the user into a BehaviorSubject object
  */
//  constructor(private http: HttpClient) {
//    let u = localStorage.getItem('user');
//    if (u != '{}' && u != undefined) {
//      this.subscribers.next(JSON.parse(u));
//    }
//  }

  /*
    The loginUser() method returns an Observable<User>. A user will be returned from the
    server asynchronously, so subscribing to this observable makes it possible to perform
    a function once a value is received.
  */
//  public loginUser(user: User) {
//    console.log(`Attempting to login user: ${user.username}`);
//   let json = JSON.stringify(user);
//   return this.http.post<User>(environment.apiUrl + 'login', json, HTTP_OPTIONS);
//  }
}
