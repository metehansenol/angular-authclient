import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/mergeMap';

import { User } from '../models/user';
import { UserService } from '../services/user.sevice';

@Component({
  moduleId: module.id,
  selector: 'app-edit-user',
  template: `<h1>Edit User</h1>
    <hr />
    <form #form="ngForm" role="form" novalidate>
    <fieldset>
      <legend>User Infos</legend>
      <div><label>Username:</label><input [(ngModel)]="user.username" type="text" name="usernameInput" required /></div>
      <div><label>Email Address:</label><input [(ngModel)]="user.emailAddress" type="email" name="emailAddressInput" required /></div>
      <div><label>Full Name:</label><input [(ngModel)]="user.fullName" type="text" name="fullNameInput" /></div>
    </fieldset>
    </form>
    <br />
    <div>
      <button (click)="saveUser()" [disabled]="!form.valid">Save</button>
      <button routerLink="/users">Cancel</button>
    </div>
    <br />
    <div class="err-msg">{{errorMessage}}</div>
  `
})
export class EditUserComponent implements OnInit {
  errorMessage: string;

  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.params.mergeMap(routeParams => this.userService.getById(routeParams.id))
      .subscribe(user => this.user = user);
  }

  saveUser() {
    this.userService.update(this.user)
      .subscribe(() => this.router.navigateByUrl('/users'));
  }
}
