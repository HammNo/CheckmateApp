import { Component, OnChanges, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger(
         'inOutAnimation',
     [ state('open', style({
        width: '200px',
        height: '400px'
      })),
      state('closed', style({
        width: '100px',
      })),
      transition('* => closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),]
    )
  ],
})
export class NavbarComponent implements OnInit, OnChanges {


  extendNav : boolean = false;
  okShowExtend : boolean = false;

  constructor(
  ) { }

  ngOnChanges(){
  }

  ngOnInit(): void {
  }

  toggleNav(){
    this.extendNav = !this.extendNav;
    if(this.extendNav){
      setTimeout(() => this.okShowExtend = true, 300);
    }
    else this.okShowExtend = false;
  }

}
