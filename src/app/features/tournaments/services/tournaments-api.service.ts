import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewTournament, Tournament } from '../models/tournament.model';
import { TQuery } from '../models/tQuery.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentsApiService {

  constructor(
    private http : HttpClient
  ) { }

  get(qParams : TQuery) : Observable<Tournament[]> {
    return this.http.get<Tournament[]>(environment.base_url + '/tournament', {params: <HttpParams> qParams});
  }

  getATournament(id : number) : Observable<Tournament>{
    return this.http.get<Tournament>(environment.base_url + '/tournament/getById?id=' + id);
  }

  add(tournament : NewTournament) : Observable<any> {
    return this.http.post<any>(environment.base_url + '/tournament/add', tournament);
  }

  delete(id : number) : Observable<any> {
    return this.http.delete<any>(environment.base_url + '/tournament/delete/'+ id);
  }
}
