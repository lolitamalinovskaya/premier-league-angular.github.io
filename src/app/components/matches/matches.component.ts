import {Component, OnInit} from '@angular/core';
import {MatchService} from "../../services/match.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {LogInService} from "../../services/log-in.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  isLoading = false;
  page?: number = 1;

  constructor(public matchService: MatchService,
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
    if (this.appService.matches.length === 0) {
      this.fetchMatches();
    }
  }

  fetchMatches(): void {
    this.isLoading = true;
    this.matchService.getMatches().subscribe({
      next: response => {
        this.appService.matches = response.data;
        this.appService.matchesLinks = response.links;
        this.appService.matchesMeta = response.meta;
        this.isLoading = false;
      },
      error: e => {
        if (e.status === '401') {
          this.logInService.getRefreshToken().subscribe({
            next: (response) => {
              this.appService.setToken(response.access_token);
              this.fetchMatches();
            },
            error: () => this.router.navigate(['500'])
          });
        }
      }
    });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.fetchMatches();
  }
}
