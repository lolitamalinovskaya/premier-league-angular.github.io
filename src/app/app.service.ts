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
  accessToken: any = null;
  user: any = null;
  googleUrl: any = null;
  teamDetails: any = {};
  matchDetails: any = {};
  favoriteTeams = new Set<any>();
  favoriteTeamResults = new Array<any>();
  favoriteTeamFixtures = new Array<any>();

  constructor() { }
}
