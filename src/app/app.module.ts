import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchesComponent } from './components/matches/matches.component';
import { TeamsComponent } from './components/teams/teams.component';
import { StatsComponent } from './components/stats/stats.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogInComponent } from './components/log-in/log-in.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { FavoriteTeamsComponent } from './components/favorite-teams/favorite-teams.component';
import { FavoriteTeamsResultComponent } from './components/favorite-teams-result/favorite-teams-result.component';
import { FavoriteTeamsFixturesComponent } from './components/favorite-teams-fixtures/favorite-teams-fixtures.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { CreateNewPlayerComponent } from './components/create-new-player/create-new-player.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'teams/:teamId', component: TeamDetailComponent },
  { path: 'matches/:matchId', component: MatchDetailComponent },
  { path: 'favorite', component: FavoriteTeamsComponent },
  { path: 'results', component: FavoriteTeamsResultComponent },
  { path: 'fixtures', component: FavoriteTeamsFixturesComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    MatchesComponent,
    TeamsComponent,
    StatsComponent,
    SignUpComponent,
    LogInComponent,
    ToolBarComponent,
    TeamDetailComponent,
    MatchDetailComponent,
    FavoriteTeamsComponent,
    FavoriteTeamsResultComponent,
    FavoriteTeamsFixturesComponent,
    NotFoundComponent,
    HomeComponent,
    ServerErrorComponent,
    CreateNewPlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  providers: [
    CreateNewPlayerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
