import { Component } from '@angular/core';
import {AppService} from "./app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'premier-league';

  constructor(public appService: AppService,
              private router: Router) {}


  logOut() {
      this.appService.user = null;
      this.router.navigate(['/']);
    }
}
