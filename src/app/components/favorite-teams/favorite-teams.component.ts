import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {FavoriteTeamsService} from "../../services/favorite-teams.service";
import {TeamsService} from "../../services/teams.service";

@Component({
  selector: 'app-favorite-teams',
  templateUrl: './favorite-teams.component.html',
  styleUrls: ['./favorite-teams.component.css']
})
export class FavoriteTeamsComponent implements OnInit {

  isLoading = false;

  constructor(public appService: AppService,
              private router: Router,
              public favoriteTeamsService: FavoriteTeamsService,
              public teamsService: TeamsService,
  ) {
  }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    this.getFavoriteTeams();
  }

  getFavoriteTeams(): void {
    if(this.appService.teams.length === 0) {
      this.isLoading = true;
      this.teamsService.getTeams().subscribe(response => {
        this.appService.teams = response.data;
        this.isLoading = false;
      })
    }
      this.favoriteTeamsService.getFavoriteTeams().subscribe(response => {
        this.appService.favoriteTeams = new Set(response.data.filter((el: any) =>
          el.user_id === this.appService.user.id).map((el: any) =>
          this.appService.teams.find(({id}) => id === el.team_id)));
        this.isLoading = false;
      })
  }
}
