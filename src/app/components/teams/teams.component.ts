import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../../services/teams.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {LogInService} from "../../services/log-in.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

 isLoading = false;
 isLike:any = {};

  constructor(public teamsService: TeamsService,
              public appService: AppService,
              private router: Router,
              public logInService: LogInService,
              ) { }

  ngOnInit(): void {
    if (this.appService.user === null) {
     this.router.navigate(['/logIn']);
      return;
    }
    if (this.appService.teams.length === 0) {
      this.getTeams();
    }
  }

  getTeams(): void {
    this.isLoading = true;
    this.teamsService.getTeams().subscribe({
      next: response => {
        this.appService.teams = response.data;
        this.isLoading = false;
      },
      error: e => {
        if (e.status === '401') {
          this.logInService.getRefreshToken().subscribe({
            next: (response) => {
              this.appService.setToken(response.access_token);
              this.getTeams();
            },
            error: () => this.router.navigate(['500'])
          });
        }
      }
    })
  }

  toggleLike(teamId: any): void {
    this.isLike[teamId] = !this.isLike[teamId];
   this.setFavoriteTeams(teamId);
  }

  setFavoriteTeams(teamId: any): void {
   this.teamsService.setFavoriteTeams(teamId).subscribe();
  }
}
