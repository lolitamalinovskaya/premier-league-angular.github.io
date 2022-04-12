import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
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
  ) {
  }

  ngOnInit(): void {
    this.getMatchDetail();
    console.log(this.appService.matchDetails);
  }

  isLoading = false;

  getMatchDetail(): void {

    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));

    this.isLoading = true;

    this.matchDetailService.getMatchDetail(matchIdFromRoute).subscribe(response => {
      this.appService.matchDetails = response.data;
      this.isLoading = false;
    })
  }
}
