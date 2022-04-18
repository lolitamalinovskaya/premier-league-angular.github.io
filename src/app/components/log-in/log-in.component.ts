import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {LogInService} from "../../services/log-in.service";
import {FormBuilder} from "@angular/forms";

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

  constructor(public appService: AppService,
              public logInService: LogInService,
              private formBuilder: FormBuilder,
              ) { }

  onSubmit(): void {
    this.logInService.onSubmit(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  redirectGoogle(): void {
    this.logInService.redirectGoogle();
  }

  ngOnInit(): void {
  }
}
