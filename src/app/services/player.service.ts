import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/players';

    return this.http.get<PlayerInterface>(url)
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
