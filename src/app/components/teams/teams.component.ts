import { Component, OnInit } from '@angular/core';
import {TeamService, TeamsInterface} from "../../services/team.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

 isLoading = false;
  constructor(public teamService: TeamService,
              public appService: AppService,) { }

  ngOnInit(): void {
    if(this.appService.teams.length === 0) {
      this.isLoading = true;
      this.teamService.getTeams().subscribe(response => {
        this.appService.teams = response.data;
        this.isLoading = false;
      })
    }
  }
}
