import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './app-home.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
