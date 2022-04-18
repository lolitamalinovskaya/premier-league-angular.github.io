import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatchDetailService} from "../../services/match-detail.service";
import {AppService} from "../../app.service";
import {MatchService} from "../../services/match.service";

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public matchDetailService: MatchDetailService,
              public appService: AppService,
              public matchService: MatchService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    this.getMatchDetail();
  }

  isLoading = false;

  getMatchDetail(): void {

    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));

    this.isLoading = true;

    this.matchDetailService.getMatchDetail(matchIdFromRoute).subscribe({
      next: ( response) => {
      this.appService.matchDetails = response.data;
      this.isLoading = false;
    },
      error: e => {
        if(e.message === '404') {
          this.router.navigate(['404']);
        } else {
          this.router.navigate(['500']);
        }
      }
  })
  }
}
