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
    const json = JSON.stringify(user);
    return this.http.post<User>(environment.apiUrl + 'users/login', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public registerUser(user: User) {
    const json = JSON.stringify(user);
    return this.http.post<User>(environment.apiUrl + 'users', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public updateUser(user: User) {
    const json = JSON.stringify(user);
    return this.http.put<User>(environment.apiUrl + 'users', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getAllUsers() {
    return this.http.get<User[]>(environment.apiUrl + 'users', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public addFriend(user: User, targetName: String) {
    const json = JSON.stringify({ targetName, user });
    return this.http.post(environment.apiUrl + 'users/friends/add', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public removeFriend(user: User, targetName: String) {
    const json = JSON.stringify({ targetName, user });
    return this.http.post(environment.apiUrl + 'users/friends/remove', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getAllFriends(currentUser: User) {
    return this.http.get<User[]>(environment.apiUrl + `users/${currentUser.userId}/friends`, {

      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public sendEmail(userList: string[], messageBody: string, messageSubject: string) {
    console.log(`Sending email with body: ${messageBody}, and subject: ${messageSubject} to: ${userList}`);
    const json = JSON.stringify({messageBody, messageSubject, userList});
    return this.http.post<User[]>(environment.apiUrl + `messages`, json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

}
