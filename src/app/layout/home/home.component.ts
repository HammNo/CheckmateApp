import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class': 'contentApp'}
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
