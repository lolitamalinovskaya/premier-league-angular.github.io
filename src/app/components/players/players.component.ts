import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {LogInService} from "../../services/log-in.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = this.appService.admin ?
    ['id', 'name', 'position', 'team', 'refactor'] :
    ['id', 'name', 'position', 'team'];
  page?: number = 0;
  isForm?:any = {};

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
            next: response => {
              this.appService.setToken(response.access_token);
              this.fetchPlayers();
            },
            error: () => this.router.navigate(['500'])
          });
        }
      }
    });
  }

  deletePlayer(id: number): void {
    this.playerService
      .deletePlayer(id)
      .subscribe({
        next: () => this.fetchPlayers()
      });
  }

  updatePlayerForm = new FormGroup({
    name: new FormControl('', Validators.minLength(4)),
    surname: new FormControl('', Validators.minLength(4)),
    team_id: new FormControl(null),
    player_position_id: new FormControl(null),
  })

  updatePlayer(id: number): void {
    this.playerService
      .updatePlayer(this.updatePlayerForm.value, id)
      .subscribe({
        next: response => {
          response.data;
          this.fetchPlayers();
          this.updatePlayerForm.reset();
          this.isForm[id] = !this.isForm[id];
        }
      })
  }

  toggleForm(id: number): void {
    this.isForm[id] = !this.isForm[id];
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.fetchPlayers();
  }
}
