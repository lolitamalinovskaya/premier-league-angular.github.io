import { Component, OnInit } from '@angular/core';
import {TeamService, TeamsInterface} from "../../services/team.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
 teams = new Array<TeamsInterface>();

  constructor(public teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(response => {
      this.teams = response.data;
    })
  }

}
