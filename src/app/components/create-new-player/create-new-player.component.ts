import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';
import {CreateNewPlayerService} from "../../services/create-new-player.service";
import {AppService} from "../../app.service";
import PlayerInterface, {PlayerService} from "../../services/player.service";
import {PlayersComponent} from "../players/players.component";

@Component({
  selector: 'app-create-new-player',
  templateUrl: './create-new-player.component.html',
  styleUrls: ['./create-new-player.component.css']
})
export class CreateNewPlayerComponent implements OnInit {

  constructor(public createPlayerService: CreateNewPlayerService, public appService: AppService,
              public playersComponent: PlayersComponent,
              ) { }

  ngOnInit(): void {
  }

  playerForm = new FormGroup({
    name: new FormControl('', Validators.minLength(4)),
    surname: new FormControl('', Validators.minLength(4)),
    team_id: new FormControl(null),
    player_position_id: new FormControl(null),
  })

  error = null;
  newPlayer = {};

  onSubmit(): void {
    this.createPlayerService
      .createPlayer(this.playerForm.value)
      .subscribe( {
        next: (response) => {
          this.newPlayer = response.data;
          this.appService.players.push(<PlayerInterface>this.newPlayer);
          this.playersComponent.fetchPlayers();
       /*   console.log(this.appService.players);*/
        },
        error: e => {
          this.error = e.error.message;
        }
      })
  }

}
