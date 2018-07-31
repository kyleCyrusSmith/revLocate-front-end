import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
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

  subscribers: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
    const u = localStorage.getItem('user');
    if (u !== '{}' && u !== undefined) {
      this.subscribers.next(JSON.parse(u));
    }
  }

  public loginUser(user: User) {
    console.log(`Attempting to login user: ${user.username}`);
    const json = JSON.stringify(user);
    console.log(`JSON: ` + json);
    return this.http.post<User>(environment.apiUrl + 'user/login', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public registerUser(user: User) {
    console.log(`Attempting to register user: ${user.username}`);
    const json = JSON.stringify(user);
    return this.http.post<User>(environment.apiUrl + 'user/register', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }
}
