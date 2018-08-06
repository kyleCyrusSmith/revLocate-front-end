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
    console.log(`Attempting to save location: (${loc.latitude}, ${loc.longitude})`);
    const json = JSON.stringify(loc);
    console.log(`JSON: ` + json);
    return this.http.post<Location>(environment.apiUrl + 'locations/new', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getLocation(locId: Number) {
    console.log(`Attempting to get location: (${locId})`);
    return this.http.get<Location>(environment.apiUrl + `locations/${locId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getRandomLocation() {
    console.log(`Attempting to get random location`);
    return this.http.get<Location>(environment.apiUrl + `locations/random`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getSet(setId: Number){
    return this.http.get<Set>(environment.apiUrl + `sets/${setId}`,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }
  
  public saveSet(newSet: Set) {
    console.log(`Attempting to save set: (${newSet})`);
    const json = JSON.stringify(newSet);
    console.log(`JSON: ` + json);
    return this.http.post<Set>(environment.apiUrl + 'sets/new', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  public getAllSets() {
    console.log(`Getting all sets`);
    return this.http.get<Set[]>(environment.apiUrl + 'sets', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }
}
