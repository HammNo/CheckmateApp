import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
  host: {'class': 'contentApp'}
})
export class TournamentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
