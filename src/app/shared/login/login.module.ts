import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConnectionComponent } from './pages/connection/connection.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { SharedModule } from '../shared.module';




@NgModule({
  declarations: [
    ConnectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports : [
    ConnectionComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class LoginModule { }
