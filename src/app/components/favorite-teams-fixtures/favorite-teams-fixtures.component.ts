import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {MatchService} from "../../services/match.service";
import {FavoriteTeamsFixturesService} from "../../services/favorite-teams-fixtures.service";

@Component({
  selector: 'app-favorite-teams-fixtures',
  templateUrl: './favorite-teams-fixtures.component.html',
  styleUrls: ['./favorite-teams-fixtures.component.css']
})
export class FavoriteTeamsFixturesComponent implements OnInit {

  isLoading = false;

  constructor(public appService: AppService,
              private router: Router,
              public favoriteTeamsFixturesService: FavoriteTeamsFixturesService,
              public matchService: MatchService) { }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    this.getFavoriteTeamResults();
  }

  getFavoriteTeamResults(): void {
    this.favoriteTeamsFixturesService.getFavoriteTeamFixtures().subscribe( response => {
      this.appService.favoriteTeamFixtures = response.data;
      this.isLoading = false;
    })
  }
}
