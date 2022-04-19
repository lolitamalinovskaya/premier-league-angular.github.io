import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
  })

  error = null;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              ) {}

  onSubmit(): void {
    const url = 'https://polar-shelf-59117.herokuapp.com/api/v1/auth/register';
    const headers = {"Content-Type": "application/json", "Accept": "application/json, text/plain, */*"};
    const body = this.checkoutForm.value;

    this.http.post<any>(url, body, {headers}).subscribe({
      next: () => this.router.navigate(['/logIn']),
      error: e => {
        this.error = e.error.message;
      }
    });

    this.checkoutForm.reset();
  }

  ngOnInit(): void {
  }
}
