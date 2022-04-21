import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient,
              public appService: AppService,
              ) { }

  public getPlayers(page?: number): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/players';
    let params = new HttpParams();

    if(page !== undefined) {
      params = params.set('page', page+1)
    }

    return this.http.get<PlayerInterface>(url, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  public deletePlayer(id?: number): Observable<any> {
    const url = `https://polar-shelf-59117.herokuapp.com/api/v1/players/${id}`;
    const headers = {"Authorization": `Bearer ${this.appService.accessToken}`, "Accept": "application/json"};

    return this.http.delete(url, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  public updatePlayer(player: any, id: number): Observable<any> {
    const url = `https://polar-shelf-59117.herokuapp.com/api/v1/players/${id}`;
    const headers = {"Authorization": `Bearer ${this.appService.accessToken}`, "Accept": "application/json"};

    return this.http.put<PlayerInterface>(url, player,{headers})
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

export default interface PlayerInterface {
  id: number,
  name: string,
  surname: string,
  position: {
    id: number,
    name: string,
  },
  team: {
    id: number,
    name: string,
  }
}
