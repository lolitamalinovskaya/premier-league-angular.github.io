import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../app.service";
import {catchError, Observable, throwError} from "rxjs";
import {MatchService} from "./match.service";

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {

  constructor(private http: HttpClient,
              public appService: AppService,
  ) { }

  public getTeamDetail(teamIdFromRoute: number): Observable<any> {
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
  logo: string,
  manager: string,
  name: string,
  players: PlayerArrayInterface[];
  stadium: number,
}

export interface PlayerArrayInterface {
  id: number | null,
  name: string,
  position?: {
    id: number,
    name: string,
  },
  surname: string,
  team?: {
    id: number,
    name: string,
  },
}
