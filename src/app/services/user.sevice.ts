import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private userApiUrl = 'http://localhost:4200/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get(this.userApiUrl)
      .map(response => response as User[]);
  }

  getById(id: number): Observable<User> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.get(url)
      .map(response => response as User);
  }

  create(username: string, password: string, fullName: string, emailAddress: string): Observable<User> {
    return this.http.post(this.userApiUrl, JSON.stringify({
      username: username,
      password: password,
      fullName: fullName,
      emailAddress: emailAddress
    })).map(response => response as User);
  }

  update(user: User): Observable<User> {
    const url = `${this.userApiUrl}/${user.id}`;
    return this.http.put(url, JSON.stringify(user))
      .map(response => response as User);
  }

  delete(id: number): Observable<any> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.delete(url);
  }
}
