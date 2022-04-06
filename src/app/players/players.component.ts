import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../player.service";


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
 players = new Array<any>();

  constructor(public playerService: PlayerService) {}


  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(response => {
      this.players = response.data;
    });
  }

}
