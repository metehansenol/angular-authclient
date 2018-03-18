import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TokenResponse } from '../models/tokenResponse';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  template: `<h1>Login</h1>
  <hr />
  <form #form="ngForm" role="form" novalidate>
  <fieldset>
    <legend>Login</legend>
    <div><label>Username:</label><input [(ngModel)]="username" type="text" name="usernameInput" required /></div>
    <div><label>Password:</label><input [(ngModel)]="password" type="password" name="passwordInput" required /></div>
  </fieldset>
  </form>
  <br />
  <div>
    <button (click)="login()" [disabled]="!form.valid">Login</button>
  </div>
  <br />
  <div class="err-msg">{{errorMessage}}</div>
`
})

export class LoginComponent {
  private authServerUrl = 'http://localhost:4200';
  private tokenEndpoint = `${this.authServerUrl}/api/token`;

  username: string;
  password: string;
  errorMessage: string;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  login() {
    const authBody = new URLSearchParams();
    authBody.set('username', this.username);
    authBody.set('password', this.password);

    this.http.post(this.tokenEndpoint, authBody.toString())
    .subscribe(response => {
      const token = response as TokenResponse;
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
      localStorage.setItem('expires_in', token.expires_in.toString());
    },
    (errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 400 && errorResponse.error.error === 'invalid_grant') {
        this.errorMessage = 'Geçersiz Kullanıcı Adı yada Şifre';
      } else {
        this.errorMessage = errorResponse.error;
      }
    },
    () => this.router.navigateByUrl('/'));
  }
}
