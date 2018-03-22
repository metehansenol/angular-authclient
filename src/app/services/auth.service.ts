import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenResponse } from '../models/tokenResponse';
import * as jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private token: TokenResponse = new TokenResponse();

  private tokenEndpoint = `http://localhost:4200/api/token`;

  constructor(private http: HttpClient) {}

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (!decoded.exp) { return null; }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = localStorage.getItem('access_token'); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (!date) { return false; }

    return !(date.valueOf() > new Date().valueOf());
  }

  getAuthHeader(): Observable<HttpHeaders> {
    this.token.access_token = localStorage.getItem('access_token');
    this.token.refresh_token = localStorage.getItem('refresh_token');
    this.token.expires_in = Number.parseInt(localStorage.getItem('expires_on'));

    if (!this.isTokenExpired(this.token.access_token)) {
      return Observable.of(new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.token.access_token}`
      }));
    } else {
      return this.refreshToken().map((hasTokenRefresh: boolean) => {
        if (hasTokenRefresh) {
          return new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${this.token.access_token}`
          });
        }
      });
    }
  }

  refreshToken(): Observable<boolean> {
    const authBody = new URLSearchParams();
    authBody.set('refresh_token', this.token.refresh_token);
    authBody.set('grant_type', 'refresh_token');

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic MToxMjM0NTY='
      })
    };

    return this.http.post(this.tokenEndpoint, authBody.toString(), options)
    .map(response => {
        this.token = response as TokenResponse;
        localStorage.setItem('access_token', this.token.access_token);
        localStorage.setItem('refresh_token', this.token.refresh_token);
        localStorage.setItem('expires_in', this.token.expires_in.toString());
        return true;
      }
    ).catch(err => {
      console.log('An error occurred while refreshing token!');
      return Observable.of(false);
    });
  }

  get(url: string, params?: any): Observable<any> {
    return this.getAuthHeader().flatMap(authHeader => {
      const options = {
        headers: authHeader,
        params: params
      };
      return this.http.get(url, options);
    });
  }

  post(url: string, body?: any): Observable<any> {
    return this.getAuthHeader().flatMap(authHeader => {
      const options = {
        headers: authHeader
      };
      return this.http.post(url, body, options);
    });
  }

  put(url: string, body?: any): Observable<any> {
    return this.getAuthHeader().flatMap(authHeader => {
      const options = {
        headers: authHeader
      };
      return this.http.put(url, body, options);
    });
  }

  delete(url: string): Observable<any> {
    return this.getAuthHeader().flatMap(authHeader => {
      const options = {
        headers: authHeader
      };
      return this.http.delete(url);
    });
  }
}
