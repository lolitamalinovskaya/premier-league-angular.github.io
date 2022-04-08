import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  public getStats(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/teams/table';

    return this.http.get<StatisticInterface>(url)
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

export interface StatisticInterface {
  id: number,
  name: string,
  logo: string,
  stats : {
    matches: number,
    points: number,
    goalScored: number,
    goalConceded: number,
    wins: number,
    draws: number,
    loses: number,
  }
}


