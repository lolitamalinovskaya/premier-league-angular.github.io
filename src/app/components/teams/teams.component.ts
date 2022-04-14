import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../../services/teams.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

 isLoading = false;
 isLike = false;
 teamId = null;

  constructor(public teamsService: TeamsService,
              public appService: AppService,
              ) { }


  ngOnInit(): void {
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
    this.appService.teams.find((team) => {
      if (team.id === teamId) {
        this.isLike = !this.isLike;
/*        return this.teamId = teamId;*/
        console.log(team.id)
    }
    })
  }
}
