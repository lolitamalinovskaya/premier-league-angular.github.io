import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'stats', component: StatsComponent },
  /*      { path: 'products/:productId', component: ProductDetailsComponent },*/
];

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    MatchesComponent,
    TeamsComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
