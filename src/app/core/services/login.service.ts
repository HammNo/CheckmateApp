import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/token.model';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Login } from '../models/login.model';
import { Role } from '../enums/role.enum';
import { Member } from '../models/member.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  role$: BehaviorSubject<Role|null> = new BehaviorSubject<Role|null>(null);
  user$: BehaviorSubject<Member|null> = new BehaviorSubject<Member|null>(null);

  constructor(
    private _http: HttpClient
  ) { }

  login(loginInfos: Login) : Observable<TokenModel> {
    return this._http.post<TokenModel>(environment.base_url + '/authentication', loginInfos)
      .pipe(
        tap(response => {
          this.token$.next(response.token);
          this.role$.next(response.role);
          this.user$.next(response.user);
        }),
        catchError(err =>{
          throw err.error;
        })
    );
  }

  logout(){
    this.token$.next(null);
    this.role$.next(null);
  }
}
