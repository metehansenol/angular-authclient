import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthFakeBackendInterceptor implements HttpInterceptor {
  // tslint:disable-next-line:max-line-length
  private jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtZXRlaGFuc2Vub2wiLCJpYXQiOjE1MjE2OTc0MjQsImV4cCI6NDEwOTM3NzQyNCwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIiwic3ViIjoibWV0ZWhhbnNlbm9sQGdtYWlsLmNvbSIsIkdpdmVuTmFtZSI6Ik1ldGVoYW4iLCJTdXJuYW1lIjoiU2Vub2wiLCJFbWFpbCI6Im1ldGVoYW5zZW5vbEBnbWFpbC5jb20iLCJSb2xlIjoiQXV0aG9yIn0.LKsIBdCe9x2NWL9RwEODYC9Wj24hnsmk2wYeGgDqVgw';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // authenticate
    if (request.url.endsWith('/api/token') && request.method === 'POST') {
      // find if any user matches login credentials
      const filteredUsers = users.filter(user => {
        return user.username === request.body.username && user.password === request.body.password;
      });

      if (filteredUsers.length) {
        // if login details are valid return 200 OK with token details and fake jwt token
        const user = filteredUsers[0];
        const body = {
          // tslint:disable-next-line:max-line-length
          access_token: this.jwtToken,
          expires_in: 60,
          token_type: 'Bearer',
          refresh_token: 'fake-refresh-token'
        };

        return Observable.of(new HttpResponse({ status: 200, body: body }));
      } else {
        // else return 400 bad request
        return Observable.throw('Username or password is incorrect');
      }
    }

    // get all users
    if (request.url.endsWith('/api/users') && request.method === 'GET') {
      if (request.headers.get('Authorization') === `Bearer ${this.jwtToken}`) {
        return Observable.of(new HttpResponse({ status: 200, body: users }));
      } else {
        // else return 401 Unauthorized
        return Observable.throw('Unauthorized');
      }
    }

    // get user by id
    if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
      if (request.headers.get('Authorization') === `Bearer ${this.jwtToken}`) {
        // find user by id in users array
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1], 10);
        const matchedUsers = users.filter(u => u.id === id);
        const user = matchedUsers.length ? matchedUsers[0] : null;

        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200, body: user }));
      } else {
        // else return 401 Unauthorized
        return Observable.throw('Unauthorized');
      }
    }

    // create user
    if (request.url.endsWith('/api/users') && request.method === 'POST') {
      if (request.headers.get('Authorization') === `Bearer ${this.jwtToken}`) {
        // get new user object from post body
        const newUser = JSON.parse(request.body);

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 201 Created
        return Observable.of(new HttpResponse({ status: 201, body: newUser }));
      } else {
        // else return 401 Unauthorized
        return Observable.throw('Unauthorized');
      }
    }

    // update user
    if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'PUT') {
      if (request.headers.get('Authorization') === `Bearer ${this.jwtToken}`) {
        // get user object from post body
        const sourceUser = JSON.parse(request.body);

        // find target user by id in users array
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1], 10);
        const matchedUsers = users.filter(u => u.id === id);
        const targetUser = matchedUsers.length ? matchedUsers[0] : null;

        // update user
        targetUser.username = sourceUser.username;
        targetUser.fullName = sourceUser.fullName;
        targetUser.emailAddress = sourceUser.emailAddress;

        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK with updated user
        return Observable.of(new HttpResponse({ status: 200, body: targetUser }));
      } else {
        // else return 401 Unauthorized
        return Observable.throw('Unauthorized');
      }
    }

    // delete user
    if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
      if (request.headers.get('Authorization') === `Bearer ${this.jwtToken}`) {
        // find user by id in users array
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1], 10);

        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.id === id) {
            // delete user
            users.splice(i, 1);
            localStorage.setItem('users', JSON.stringify(users));
            break;
          }
        }

        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      } else {
        // else return 401 Unauthorized
        return Observable.throw('Unauthorized');
      }
    }

    return next.handle(request);

  }
}

export let authFakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthFakeBackendInterceptor,
  multi: true
};
