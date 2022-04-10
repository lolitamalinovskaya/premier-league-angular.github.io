import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {AppService} from "../../app.service";


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

 isLoading = false;
 displayedColumns: string[] = ['id', 'name', 'position', 'team'];

  constructor(public playerService: PlayerService,
              public appService: AppService,) {}

  ngOnInit(): void {
    if(this.appService.players.length === 0) {
      this.isLoading = true;
      this.playerService.getPlayers().subscribe(response => {
        this.appService.players = response.data;
        this.isLoading = false;
      });
    }
  }

}
