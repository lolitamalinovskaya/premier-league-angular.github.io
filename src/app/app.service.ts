import { Injectable } from '@angular/core';
import {MatchInterface} from "./services/match.service";
import {StatisticInterface} from "./services/stat.service";
import PlayerInterface from "./services/player.service";
import {TeamsInterface} from "./services/team.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  matches = new Array<MatchInterface>();
  stats = new Array<StatisticInterface>();
  players = new Array<PlayerInterface>();
  teams = new Array<TeamsInterface>();
  accessToken: any = null;
  user: any = null;
  googleUrl: any = null;

  constructor() { }
}
