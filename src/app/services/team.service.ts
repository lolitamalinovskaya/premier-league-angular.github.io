import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  public getTeams(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/teams';

    return this.http.get<TeamsInterface>(url)
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
