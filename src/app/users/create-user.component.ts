import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.sevice';

@Component({
  moduleId: module.id,
  selector: 'app-create-user',
  template: `<h1>Create New User</h1>
    <hr />
    <form #form="ngForm" role="form" novalidate>
    <fieldset>
      <legend>New User Info</legend>
      <div><label>Username:</label><input [(ngModel)]="username" type="text" name="usernameInput" required /></div>
      <div><label>Password:</label><input [(ngModel)]="password" type="password" name="passwordInput" required /></div>
      <div><label>Password (retype):</label><input [(ngModel)]="passwordConfirm" type="password"
        name="passwordConfirmInput" required /></div>
      <div><label>Email Address:</label><input [(ngModel)]="emailAddress" type="email" name="emailAddressInput" required /></div>
      <div><label>Full Name:</label><input [(ngModel)]="fullName" type="text" name="fullNameInput" /></div>
    </fieldset>
    </form>
    <br />
    <div><button (click)="createUser()" [disabled]="!form.valid">Create</button></div>
    <br />
    <div class="err-msg">{{errorMessage}}</div>
  `
})
export class CreateUserComponent {
  errorMessage: string;

  username: string;
  password: string;
  passwordConfirm: string;
  emailAddress: string;
  fullName: string;

  constructor(
    private userService: UserService,
    private router: Router) {}

  createUser() {
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Passwords does not match. Please retype your password below.';
      return;
    }

    this.userService.create(
        this.username,
        this.password,
        this.fullName,
        this.emailAddress)
      .subscribe(() => this.router.navigateByUrl('/users'));
  }
}
