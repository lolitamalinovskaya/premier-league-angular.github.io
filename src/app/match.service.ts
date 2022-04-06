import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  public getMatch(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/matches';

    return this.http.get<any>(url);
  }
}
