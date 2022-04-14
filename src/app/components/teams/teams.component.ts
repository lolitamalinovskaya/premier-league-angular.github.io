import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../../services/teams.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

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
              ) { }

  ngOnInit(): void {
    if (this.appService.user === null) {
     this.router.navigate(['/logIn']);
      return;
    }
    this.getTeams();
  }

  getTeams(): void {
    if(this.appService.teams.length === 0) {
      this.isLoading = true;
      this.teamsService.getTeams().subscribe(response => {
        this.appService.teams = response.data;
        this.isLoading = false;
      })
    }
  }

  toggleLike(teamId: any): void {
    this.isLike[teamId] = !this.isLike[teamId];
   this.setFavoriteTeams(teamId);
  }

  setFavoriteTeams(teamId: any): void {
   this.teamsService.setFavoriteTeams(teamId).subscribe();
  }
}
