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

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  /*{ path: 'products/:productId', component: ProductDetailsComponent },*/
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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
