import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/players';

    return this.http.get<any>(url);
  }
}
