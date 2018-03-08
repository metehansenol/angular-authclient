import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './app-home.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: CreateUserComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
