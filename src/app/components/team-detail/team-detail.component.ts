import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TeamsService} from "../../services/teams.service";
import {AppService} from "../../app.service";
import {TeamDetailsService} from "../../services/team-details.service";

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private teamDetailService: TeamDetailsService,
    public appService: AppService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    this.getTeamDetail();
  }

  isLoading = false;

  getTeamDetail(): void {

    const routeParams = this.route.snapshot.paramMap;
    const teamIdFromRoute = Number(routeParams.get('teamId'));

    this.isLoading = true;
    this.teamDetailService.getTeamDetail(teamIdFromRoute).subscribe(response => {
      this.appService.teamDetails = response.data;
      this.isLoading = false;
    })


  }
}
