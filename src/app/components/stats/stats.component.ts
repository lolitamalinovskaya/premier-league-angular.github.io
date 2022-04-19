import {Component, OnInit} from '@angular/core';
import {StatService} from "../../services/stat.service";
import {AppService} from "../../app.service";
import {LogInService} from "../../services/log-in.service";
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
              public logInService: LogInService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.appService.stats.length === 0) {
      this.getStats();
    }
  }

  getStats(): void {
    this.isLoading = true;
    this.statService.getStats().subscribe({
      next: response => {
        this.appService.stats = response.data;
        this.appService.stats.sort((a, b) => b.stats.points - a.stats.points);
        this.isLoading = false;
      },
      error: e => {
        if (e.status === '401') {
          this.logInService.getRefreshToken().subscribe({
            next: (response) => {
              this.appService.setToken(response.access_token);
              this.getStats();
            },
            error: () => this.router.navigate(['500'])
          });
        }
      }
    })
  }
}
