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
}
