import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

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
    return this.http.post<User>(environment.apiUrl + 'users/login', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public registerUser(user: User) {
    console.log(`Attempting to register user: ${user.username}`);
    const json = JSON.stringify(user);
    return this.http.post<User>(environment.apiUrl + 'users', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public updateUser(user: User) {
    console.log(`Attempting to update user: ${user.username}`);
    const json = JSON.stringify(user);
    return this.http.put<User>(environment.apiUrl + 'users', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getAllUsers() {
    console.log(`Getting all users`);
    return this.http.get<User[]>(environment.apiUrl + 'users', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public addFriend(user: User, targetName: String) {
    console.log(`${user.username} is attempting to add friend: ${targetName}`);
    const json = JSON.stringify({ targetName, user });
    return this.http.post(environment.apiUrl + 'users/friends/add', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public removeFriend(user: User, targetName: String) {
    console.log(`${user.username} is attempting to remove friend: ${targetName}`);
    const json = JSON.stringify({ targetName, user });
    return this.http.post(environment.apiUrl + 'users/friends/remove', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getAllFriends(currentUser: User) {
    console.log(`Getting all friends of ${currentUser.username}`);
    return this.http.get<User[]>(environment.apiUrl + 'users/friends', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

}
