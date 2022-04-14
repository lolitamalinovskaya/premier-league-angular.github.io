import { Component, OnInit } from '@angular/core';
import {MatchService} from "../../services/match.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

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
              ) { }

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
    this.matchService.getMatches().subscribe(response => {
      this.appService.matches = response.data;
      this.appService.matchesLinks = response.links;
      this.appService.matchesMeta = response.meta;
      this.isLoading = false;
    });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.fetchMatches();
  }
}
