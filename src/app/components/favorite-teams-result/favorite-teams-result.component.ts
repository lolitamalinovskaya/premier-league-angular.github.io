import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {FavoriteTeamsResultService} from "../../services/favorite-teams-result.service";
import {MatchService} from "../../services/match.service";

@Component({
  selector: 'app-favorite-teams-result',
  templateUrl: './favorite-teams-result.component.html',
  styleUrls: ['./favorite-teams-result.component.css']
})
export class FavoriteTeamsResultComponent implements OnInit {

  isLoading = false;

  constructor(public appService: AppService,
              private router: Router,
              public favoriteTeamsResultsService: FavoriteTeamsResultService,
              public matchService: MatchService) { }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    this.getFavoriteTeamResults();
  }

  getFavoriteTeamResults(): void {
    this.favoriteTeamsResultsService.getFavoriteTeamResults().subscribe( response => {
      this.appService.favoriteTeamResults = response.data;
      this.isLoading = false;
    })
  }
}
