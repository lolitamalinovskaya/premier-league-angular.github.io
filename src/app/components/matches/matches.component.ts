import { Component, OnInit } from '@angular/core';
import {MatchService} from "../../services/match.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

isLoading = false;
  constructor(public matchService: MatchService,
              public appService: AppService,) { }

  ngOnInit(): void {
    if (this.appService.matches.length === 0) {
      this.isLoading = true;
      this.matchService.getMatches().subscribe(response => {
        this.appService.matches = response.data;
        this.isLoading = false;
      })
    }
  }

  parseDate(string: string) {
    let fullDate = new Date(string);
    let month = fullDate.toLocaleString('en', {month: "short"});
    let year = fullDate.getFullYear();
    let time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
    let date = `${fullDate.getDate()} ${month} ${year}`;

    return `${date} ${time}`;
  }
}
