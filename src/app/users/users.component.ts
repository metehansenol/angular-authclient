import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.sevice';

@Component({
  selector: 'app-users',
  template: `<h1>Users</h1>
    <hr />
    <table border="1">
      <tr>
        <th>Id</th>
        <th>Username</th>
        <th>Full Name</th>
        <th>Email Address</th>
        <th>&nbsp;</th>
      </tr>
      <tr *ngFor="let user of users">
        <td>{{user.id}}</td>
        <td>{{user.username}}</td>
        <td>{{user.fullName}}</td>
        <td>{{user.emailAddress}}</td>
        <td><button [routerLink]="['/users/edit', user.id]">Edit</button></td>
      </tr>
    </table>
    <br />
    <button routerLink="/users/create">Create User</button>
  `
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { console.log('users component!'); }

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }
}
