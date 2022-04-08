import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  public getMatches(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/matches';

    return this.http.get<MatchInterface>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    error.status === 0 ?
      console.log('An error occurred:', error.error) :
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

export interface MatchInterface {
  id: number,
  is_started: boolean,
  is_finished: boolean,
  home_team : {
    name: string,
    logo: string,
  },
  away_team : {
    name: string,
    logo: string,
  },
  stadium: string,
  date: string,
  stats: {
    goals_home_team: number,
    goals_away_team: number,
  }
}
