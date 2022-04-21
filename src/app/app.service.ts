import {Injectable} from '@angular/core';
import {MatchInterface} from "./services/match.service";
import {StatisticInterface} from "./services/stat.service";
import PlayerInterface from "./services/player.service";
import {TeamsInterface} from "./services/teams.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  matches = new Array<MatchInterface>();
  stats = new Array<StatisticInterface>();
  players = new Array<PlayerInterface>();
  teams = new Array<TeamsInterface>();
  playersLinks:any = {};
  playersMeta:any = {};
  matchesLinks:any = {};
  matchesMeta:any = {};
  accessToken: any = localStorage.getItem('access_token');
  user: any = (() => {
    const json = localStorage.getItem('user');
    if (json === null) {
      return null;
    }
    return JSON.parse(json);
  })();
  googleUrl: any = null;
  teamDetails: any = {};
  matchDetails: any = {};
  favoriteTeams = new Set<any>();
  favoriteTeamResults = new Array<any>();
  favoriteTeamFixtures = new Array<any>();
  admin: boolean = this.user?.role === 'admin';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(`access_token`, token);
    this.accessToken = token;
  }

  setUser(user: any): void {
    localStorage.setItem(`user`, JSON.stringify(user));
    this.user = user;
  }

  logOut(): void {
    this.user = null;
    this.accessToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
}
