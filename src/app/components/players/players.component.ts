import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {LogInService} from "../../services/log-in.service";


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['id', 'name', 'position', 'team'];
  page?: number = 1;

  constructor(public playerService: PlayerService,
              public appService: AppService,
              private router: Router,
              public logInService: LogInService,
  ) {}

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }

    if (this.appService.players.length === 0) {
      this.fetchPlayers();
    }
  }

  fetchPlayers(): void {
    this.isLoading = true;
    this.playerService.getPlayers(this.page).subscribe({
      next: response => {
        this.appService.players = response.data;
        this.appService.playersLinks = response.links;
        this.appService.playersMeta = response.meta;
        this.isLoading = false;
      },
      error: e => {
        if (e.status === '401') {
          this.logInService.getRefreshToken().subscribe({
            next: (response) => {
              this.appService.setToken(response.access_token);
              this.fetchPlayers();
            },
            error: () => this.router.navigate(['500'])
          });
        }
      }
    });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.fetchPlayers();
  }
}
