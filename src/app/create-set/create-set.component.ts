import { Component, OnInit } from '@angular/core';
import { CreateLocationComponent } from '../create-location/create-location.component';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  printLatLng() {
    console.log('hey');
  }
}
