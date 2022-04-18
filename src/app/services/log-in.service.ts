import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AppService} from "../app.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(
              private http: HttpClient,
              public appService: AppService,
              private router: Router,
              ) { }

  onSubmit(body: any): void {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/auth/login';
    const headers = {"Content-Type": "application/json"};

    this.http.post<any>(url, body,{ headers }).subscribe( data => {
     this.appService.setToken(data.access_token);
      const headers = {"Authorization": `Bearer ${this.appService.accessToken}`};

      this.http.get<any>('https://polar-shelf-59117.herokuapp.com/api/v1/auth/user', { headers }).subscribe(data => {
        this.appService.setUser(data.data);
        this.router.navigate(['']);
      })
    });
  }

  getRefreshToken(): Observable<any> {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/auth/refresh';
    const headers = {"Content-Type": "application/json"};

    return this.http.post<any>(url, {headers})
  }

  redirectGoogle(): void {
    this.http.get<any>('https://polar-shelf-59117.herokuapp.com/api/v1/auth/google').subscribe(data => {
      this.appService.googleUrl = data?.url;

      if(this.appService.googleUrl !== null) window.open(`${this.appService.googleUrl}`, "_blank");
    })
  }
}
