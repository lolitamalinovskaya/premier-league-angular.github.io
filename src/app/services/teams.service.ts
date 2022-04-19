import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient,
              public appService: AppService,
              ) { }

  public getTeams(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/teams';

    return this.http.get<TeamsInterface>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  public setFavoriteTeams(teamId: any): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/user-favorite-teams';
    const headers = {
        "Authorization": `Bearer ${this.appService.accessToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*"
    };
    const body = {
      "user_id": this.appService.user?.id,
      "team_id": teamId
    };

  return this.http.post<any>(url, body, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    error.status === 0 ?
      console.error('An error occurred:', error.error) :
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

    return throwError(() => new Error(`${error.status}`));
  }
}

export interface TeamsInterface {
  id: number,
  name: string,
  stadium: string,
  manager: string,
  is_favorite: {
    id: number | null,
    exists: boolean,
  }
  logo: string,
}
