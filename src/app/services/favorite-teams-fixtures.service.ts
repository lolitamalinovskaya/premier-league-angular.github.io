import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../app.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteTeamsFixturesService {

  constructor(private http: HttpClient,
              public appService: AppService,) { }


  public getFavoriteTeamFixtures(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/matches/fixtures';

    const headers = {"Authorization": `Bearer ${this.appService.accessToken}`, "Accept": "application/json"}

    return this.http.get<any>(url,{ headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    error.status === 0 ?
      console.error('An error occurred:', error.error) :
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
