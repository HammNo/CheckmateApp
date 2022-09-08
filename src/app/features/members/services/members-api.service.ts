import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../../../core/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersApiService {

  constructor(
    private http : HttpClient
  ) { }

  get() : Observable<Member[]> {
    return this.http.get<Member[]>(environment.base_url  +'/member');
  }

  add(member : Member) : Observable<any> {
    return this.http.post<any>(environment.base_url + '/member/add', member);
  }

  delete(id : number) : Observable<any> {
    return this.http.delete<any>(environment.base_url + '/member/delete/'+ id);
  }

  existsNickname(nickname: string): Observable<void> {
    const params = new HttpParams({
      fromObject: { nickname }
    })
    return this.http.head<void>(environment.base_url + '/member/existsNickname', {params});
  }
}
