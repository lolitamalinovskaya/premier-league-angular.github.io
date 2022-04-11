import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../app.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {

  constructor(private http: HttpClient,
              public appService: AppService,
  ) { }

  public getDetailsTeam(teamIdFromRoute: number): Observable<any> {
    const url = `https://polar-shelf-59117.herokuapp.com/api/v1/teams/${teamIdFromRoute}`;

    return this.http.get<TeamDetailsInterface>(url)
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

export interface TeamDetailsInterface {
  id: number,
  name: string,
  stadium: number,
  manager: string,
  players?: PlayerArrayInterface[];
  logo: string,
}

export interface PlayerArrayInterface {
  id: number | null,
  name: string,
  surname: string,
  position?: {
    id: number,
    name: string,
  },
  team?: any;
}
