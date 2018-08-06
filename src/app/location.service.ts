import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from './models/location';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { Set } from './models/set';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  tempSet: Set = new Set;

  subscribers: BehaviorSubject<Location> = new BehaviorSubject<Location>(null);

  constructor(private http: HttpClient) { }

  public saveLocation(loc: Location) {
    const json = JSON.stringify(loc);
    return this.http.post<Location>(environment.apiUrl + 'locations', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getLocation(locId: Number) {
    return this.http.get<Location>(environment.apiUrl + `locations/${locId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getRandomLocation() {
    return this.http.get<Location>(environment.apiUrl + `locations/random`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getSet(setId: Number) {
    return this.http.get<Set>(environment.apiUrl + `sets/${setId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  public saveSet(newSet: Set) {
    const json = JSON.stringify(newSet);
    return this.http.put<Set>(environment.apiUrl + 'sets', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getAllSets() {
    return this.http.get<Set[]>(environment.apiUrl + 'sets', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }
}
