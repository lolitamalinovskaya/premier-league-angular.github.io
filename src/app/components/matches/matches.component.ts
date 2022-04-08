import { Component, OnInit } from '@angular/core';
import {MatchInterface, MatchService} from "../../services/match.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
matches = new Array<MatchInterface>();

  constructor(public matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.getMatches().subscribe(response => {
      this.matches = response.data;
    })
  }
}
