import { Component, OnInit } from '@angular/core';

export interface PopularSet {
  setName: String;
  rating: Number;
  highscore: Number;
}

const DUMMY_POPULAR_SET_DATA: PopularSet[] = [
  { setName: 'Testset', rating: 4, highscore: 1079 },
  { setName: 'Someset', rating: 3, highscore: 355 },
  { setName: 'Dummyset', rating: 5, highscore: 479 },
  { setName: 'Newset', rating: 4.5, highscore: 108 },
  { setName: 'Oldset', rating: 3.7, highscore: 155 },
];

@Component({
  selector: 'app-popular-sets',
  templateUrl: './popular-sets.component.html',
  styleUrls: ['./popular-sets.component.css']
})
export class PopularSetsComponent implements OnInit {

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource = sortByRating(DUMMY_POPULAR_SET_DATA).reverse();

  constructor() { }

  ngOnInit() {
  }

}

function sortByRating(ratingArray: PopularSet[]): PopularSet[] {
  return ratingArray.sort(function (a, b) {
    const x = a.rating;
    const y = b.rating;
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
}
