import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.sevice';

@Component({
  moduleId: module.id,
  selector: 'app-create-user',
  template: `<h1>Create New User</h1>
    <hr />
    <form>
    <fieldset>
      <legend>New User Info</legend>
      <div><label>Username:</label><input [(ngModel)]="username" type="text" name="usernameInput" /></div>
      <div><label>Password:</label><input [(ngModel)]="password" type="password" name="passwordInput" /></div>
      <div><label>Password (retype):</label><input [(ngModel)]="passwordConfirm" type="password" name="passwordConfirmInput" /></div>
      <div><label>Email Address:</label><input [(ngModel)]="emailAddress" type="text" name="emailAddressInput" /></div>
      <div><label>Full Name:</label><input [(ngModel)]="fullName" type="text" name="fullNameInput" /></div>
      <div><button (click)="createUser()">Create</button></div>
    </fieldset>
    </form>
  `
})
export class CreateUserComponent {
  username: string;
  password: string;
  passwordConfirm: string;
  emailAddress: string;
  fullName: string;

  constructor(
    private userService: UserService,
    private router: Router) {}

  createUser() {
    this.userService.create(
        this.username,
        this.password,
        this.fullName,
        this.emailAddress)
      .subscribe(() => this.router.navigateByUrl('/users'));
  }
}
