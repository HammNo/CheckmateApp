import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { connect, Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(
    private _loginService: LoginService,
    private _messageService : MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAdmin = this._loginService.role$.value === Role.Admin;
      if(!isAdmin) {
        this._messageService.add({severity:'warn', summary:'Info', detail:"Vous devez disposer des droits d'administration"});
      }
      return isAdmin;
    }
}
