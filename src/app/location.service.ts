import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from './models/location';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

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

  public getLocation(locId: number) {
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
}