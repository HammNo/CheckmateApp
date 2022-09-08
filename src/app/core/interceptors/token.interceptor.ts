import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _loginService: LoginService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this._loginService.token$.value) {
      const clone = request.clone({
        setHeaders: { Authorization: 'Bearer ' + this._loginService.token$.value }
      });
      return next.handle(clone);
    }
    return next.handle(request);
  }
}
