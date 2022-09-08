import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  host: {'class': 'contentApp'}
})
export class MembersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
