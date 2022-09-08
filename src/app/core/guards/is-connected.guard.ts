import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsConnectedGuard implements CanActivate {

  constructor(
    private _loginService: LoginService,
    private _messageService : MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isConnected = this._loginService.token$.value != null;
      if(!isConnected){
        this._messageService.add({severity:'warn', summary:'Info', detail:"Vous devez d'abord vous connecter"});
      }
    return isConnected;
  }

}
