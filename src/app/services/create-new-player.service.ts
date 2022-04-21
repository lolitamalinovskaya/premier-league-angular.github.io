import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import PlayerInterface from "./player.service";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class CreateNewPlayerService {

  constructor(private http: HttpClient, public appService: AppService) { }

  public createPlayer(player: any): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/players'
    const headers = {"Authorization": `Bearer ${this.appService.accessToken}`, "Accept": "application/json"};

    return this.http.post<PlayerInterface>(url, player,{ headers })
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
