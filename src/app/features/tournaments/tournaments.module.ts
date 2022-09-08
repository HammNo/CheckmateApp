import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentsComponent } from './tournaments.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/list/search/search.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../../shared/shared.module';
import { EditComponent } from './pages/edit/edit.component';


@NgModule({
  declarations: [
    TournamentsComponent,
    ListComponent,
    AddComponent,
    SearchComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class TournamentsModule { }
