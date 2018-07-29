import { Component, OnInit } from '@angular/core';

export interface GlobalMessage {
  messenger: String;
  message: String;
}

const DUMMY_MESSAGE_DATA: GlobalMessage[] = [
  {messenger: 'TestMessenger', message: 'TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'SampleMessenger', message: 'SampleMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'GoodMessenger', message: 'GoodMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'BadMessenger', message: 'BadMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage' +
                                       'TestMessage TestMessage TestMessage'},
  {messenger: 'OldMessenger', message: 'OldMessage TestMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'NewMessenger', message: 'NewMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage' +
                                       'TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'UpdateMessenger', message: 'UpdateMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'NewsMessenger', message: 'NewsMessage TestMessage TestMessage TestMessage TestMessage TestMessage'},
  {messenger: 'WhatMessenger', message: 'WhatMessage TestMessage TestMessage TestMessage'},
  {messenger: 'WhoMessenger', message: 'WhoMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage TestMessage'},
];

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.css']
})
export class MessageBarComponent implements OnInit {

  displayedColumns = ['messenger', 'message'];
  dataSource = DUMMY_MESSAGE_DATA;

  constructor() { }

  ngOnInit() {
  }

}
