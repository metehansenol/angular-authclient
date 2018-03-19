import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './app-home.component';
import { LoginComponent } from './login/login.component';

import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user.component';
import { EditUserComponent } from './users/edit-user.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
