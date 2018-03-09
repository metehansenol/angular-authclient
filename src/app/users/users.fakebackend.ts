import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { User } from '../models/user';

@Injectable()
export class UsersFakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // get all users
    if (request.url.endsWith('/api/users') && request.method === 'GET') {
      return Observable.of(new HttpResponse({ status: 200, body: users }));
    }

    // get user by id
    if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
      // find user by id in users array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      const matchedUsers = users.filter(u => u.id === id);
      const user = matchedUsers.length ? matchedUsers[0] : null;

      // respond 200 OK
      return Observable.of(new HttpResponse({ status: 200, body: user }));
    }

    // create user
    if (request.url.endsWith('/api/users') && request.method === 'POST') {
      // get new user object from post body
      const newUser = JSON.parse(request.body);

      // save new user
      newUser.id = users.length + 1;
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // respond 201 Created
      return Observable.of(new HttpResponse({ status: 201, body: newUser }));
    }

    // update user
    if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'PUT') {
      // get user object from post body
      const sourceUser = JSON.parse(request.body);

      // find target user by id in users array
      const urlParts = request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      const matchedUsers = users.filter(u => u.id === id);
      const targetUser = matchedUsers.length ? matchedUsers[0] : null;

      // update user
      targetUser.name = sourceUser.name;
      targetUser.unit = sourceUser.unit;
      targetUser.price = sourceUser.price;
      targetUser.currency = sourceUser.currency;

      localStorage.setItem('users', JSON.stringify(users));

      // respond 200 OK with updated user
      return Observable.of(new HttpResponse({ status: 200, body: targetUser }));
    }

    // delete user
    if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
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
    }

    return next.handle(request);

  }
}

export let usersFakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UsersFakeBackendInterceptor,
  multi: true
};
