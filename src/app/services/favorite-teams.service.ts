import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../app.service";
import {catchError, Observable, throwError} from "rxjs";
import {TeamsInterface} from "./teams.service";

@Injectable({
  providedIn: 'root'
})
export class FavoriteTeamsService {

  constructor(private http: HttpClient,
              public appService: AppService,) { }

  public getFavoriteTeams(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/user-favorite-teams';

    return this.http.get<any>(url)
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
