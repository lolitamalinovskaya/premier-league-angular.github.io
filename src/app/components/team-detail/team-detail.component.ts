import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TeamsService} from "../../services/teams.service";
import {AppService} from "../../app.service";
import {TeamDetailsService} from "../../services/team-details.service";
import {LogInService} from "../../services/log-in.service";

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
    public logInService: LogInService,
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
    this.teamDetailService.getTeamDetail(teamIdFromRoute).subscribe({
      next: (response) => {
        this.appService.teamDetails = response.data;
        this.isLoading = false;
      },
      error: e => {
        if(e.status === '401') {
          this.logInService.getRefreshToken().subscribe({
            next: (response) => {
              this.appService.setToken(response.access_token);
              this.getTeamDetail();
            },
            error: () => this.router.navigate(['500'])
          });
        }
       if(e.message === '404') {
         this.router.navigate(['404']);
       } else {
         this.router.navigate(['500']);
       }
      }
    })
  }
}
