import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    password: '',
    email: '',
  })

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              public appService: AppService,
              private router: Router,
              ) { }

  onSubmit(): void {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/auth/login';
    const headers = {"Content-Type": "application/json"};
    const body = this.checkoutForm.value;

    this.http.post<any>(url, body,{ headers }).subscribe( data => {
      this.appService.accessToken = data.access_token;
      const headers = {"Authorization": `Bearer ${this.appService.accessToken}`};

      this.http.get<any>('https://polar-shelf-59117.herokuapp.com/api/v1/auth/user', { headers }).subscribe(data => {
        this.appService.user = data.data;
        this.router.navigate(['']);
      })
    });
    this.checkoutForm.reset();
  }

  redirectGoogle(): void {
    this.http.get<any>('https://polar-shelf-59117.herokuapp.com/api/v1/auth/google').subscribe(data => {
      this.appService.googleUrl = data?.url;

      if(this.appService.googleUrl !== null) window.open(`${this.appService.googleUrl}`, "_blank");
    })
  }

  ngOnInit(): void {
  }
}
