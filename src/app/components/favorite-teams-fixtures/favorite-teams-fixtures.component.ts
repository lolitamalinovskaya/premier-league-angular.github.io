import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {MatchService} from "../../services/match.service";
import {FavoriteTeamsFixturesService} from "../../services/favorite-teams-fixtures.service";
import {LogInService} from "../../services/log-in.service";

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
              public matchService: MatchService,
              public logInService: LogInService,) {
  }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    this.getFavoriteTeamResults();
  }

  getFavoriteTeamResults(): void {
    this.isLoading = true;
    this.favoriteTeamsFixturesService.getFavoriteTeamFixtures().subscribe({
      next: response => {
        this.appService.favoriteTeamFixtures = response.data;
        this.isLoading = false;
      },
      error: e => {
        if (e.status === '401') {
          this.logInService.getRefreshToken().subscribe({
            next: (response) => {
              this.appService.setToken(response.access_token);
              this.getFavoriteTeamResults();
            },
            error: () => this.router.navigate(['500'])
          });
        }
      }
    })
  }
}
