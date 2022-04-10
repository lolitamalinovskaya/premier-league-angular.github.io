import { Component } from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'premier-league';

  constructor(public appService: AppService) {}


  logOut() {
      this.appService.user = null;
    }
}
