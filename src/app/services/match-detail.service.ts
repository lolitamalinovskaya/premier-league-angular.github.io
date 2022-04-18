import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../app.service";
import {catchError, Observable, throwError} from "rxjs";
import {MatchService} from "./match.service";

@Injectable({
  providedIn: 'root'
})
export class MatchDetailService {

  constructor(private http: HttpClient, public appService: AppService) { }

  public getMatchDetail(matchIdFromRoute: number): Observable<any> {
    const url = `https://polar-shelf-59117.herokuapp.com/api/v1/matches/${matchIdFromRoute}`

    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    error.status === 0 ?
      console.error('An error occurred:', error.error) :
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public showNamePlayer(id: any) {
    const playersAwayTeam = this.appService.matchDetails?.away_team.players;
    const playersHomeTeam = this.appService.matchDetails?.home_team.players;
    const arrayAllPlayers = playersAwayTeam?.concat(playersHomeTeam);
    const objPlayers = arrayAllPlayers?.find((el:any) => id === el.id);

    return `${objPlayers?.name || ''} ${objPlayers?.surname || ''}`;
  }
}

export interface MatchDetailInterface {
  id: number,
  is_started: boolean,
  is_finished: boolean,
  home_team: {
    id: number,
    name: string,
    stadium: number,
    manager: string,
    players: MatchDetailPlayersInterface[],
    logo: string,
  }
  away_team: {
    id: number,
    name: string,
    stadium: number,
    manager: string,
    players: MatchDetailPlayersInterface[],
    logo: string,
  }
  stadium: {
    id: number,
    name: string,
    capacity: number,
    city: string,
  }
  date: string,
  match_events: [],
  game_events: [],
  stats: null | number,
}

export interface MatchDetailPlayersInterface {
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
