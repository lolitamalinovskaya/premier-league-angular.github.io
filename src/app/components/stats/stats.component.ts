import { Component, OnInit } from '@angular/core';
import {StatService} from "../../services/stat.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
   isLoading = false;
   displayedColumns: string[] = ['name', 'matches', 'wins', 'draws', 'loses', 'GF', 'GA', 'GD', 'PTS'];

  constructor(public statService: StatService,
              public appService: AppService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }
    if (this.appService.stats.length === 0) {
      this.isLoading = true;
      this.statService.getStats().subscribe(response => {
        this.appService.stats = response.data;
        this.appService.stats.sort((a,b) => b.stats.points - a.stats.points);
        this.isLoading = false;
      })
    }
  }
}
