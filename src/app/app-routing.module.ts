import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard';

import { AppHomeComponent } from './app-home.component';
import { LoginComponent } from './login/login.component';

import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user.component';
import { EditUserComponent } from './users/edit-user.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
