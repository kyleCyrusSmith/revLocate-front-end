import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

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

let rowClicked;

@Component({
  selector: 'app-popular-sets',
  templateUrl: './popular-sets.component.html',
  styleUrls: ['./popular-sets.component.css']
})
export class PopularSetsComponent implements OnInit {

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource = sortByRating(DUMMY_POPULAR_SET_DATA).reverse();

  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(row): void {
    rowClicked = row;
    this.bottomSheet.open(PopularSetBottomSheetComponent);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-popular-sets-bottom-sheet',
  templateUrl: './popular-sets-bottom-sheet.component.html',
})
export class PopularSetBottomSheetComponent {

  displayedColumns: string[] = ['setName', 'rating', 'highscore'];
  dataSource: PopularSet[] = [{ setName: rowClicked.setName, rating: rowClicked.rating, highscore: rowClicked.highscore }];

  constructor(private bottomSheetRef: MatBottomSheetRef<PopularSetBottomSheetComponent>) {}

  playSet() {
    console.log(`play set`);
    this.bottomSheetRef.dismiss();
    /* add a link to start a solo game of this set
    */
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
