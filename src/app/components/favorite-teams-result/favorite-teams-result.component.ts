import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {FavoriteTeamsResultService} from "../../services/favorite-teams-result.service";
import {MatchService} from "../../services/match.service";
import {LogInService} from "../../services/log-in.service";

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
    this.favoriteTeamsResultsService.getFavoriteTeamResults().subscribe({
      next: response => {
        this.appService.favoriteTeamResults = response.data;
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
