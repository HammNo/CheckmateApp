import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';

import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    MembersComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class MembersModule { }
