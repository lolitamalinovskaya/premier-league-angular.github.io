import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";


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
              ) {}

  ngOnInit(): void {
    if (this.appService.user === null) {
      this.router.navigate(['/logIn']);
      return;
    }

    if(this.appService.players.length === 0) {
     this.fetchPlayers();
    }
  }

   fetchPlayers(): void {
    this.isLoading = true;
    this.playerService.getPlayers(this.page).subscribe(response => {
      this.appService.players = response.data;
      this.appService.playersLinks = response.links;
      this.appService.playersMeta = response.meta;
      this.isLoading = false;
    });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.fetchPlayers();
  }
}
