import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TQuery } from '../../../models/tQuery.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: {'class': 'subSubContentApp'}
})
export class SearchComponent implements OnInit {

  @Output() searchEvent : EventEmitter<TQuery>;
  fg! : FormGroup;

  constructor(
    private builder : FormBuilder,
    ){
    this.searchEvent = new EventEmitter<TQuery>()
  }

  ngOnInit(): void {
    this.fg = this.builder.group({
      take : [],
      searchedName : [],
    });
  }

  validSearch() {
    let searchQuery : TQuery = new TQuery();
    if(this.fg.value.take > 0) searchQuery.take = this.fg.value.take;
    else this.fg.controls['take'].setValue(null);
    if(this.fg.value.searchedName != null) searchQuery.searchedName = this.fg.value.searchedName;
    this.searchEvent.emit(searchQuery);
  }

}
