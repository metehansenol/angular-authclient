import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UsersFakeBackendInterceptor, usersFakeBackendProvider } from './users/users.fakebackend';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home.component';

import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user.component';

import { UserService } from './services/user.sevice';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    UsersComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule /*this should be last*/
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UsersFakeBackendInterceptor,
      multi: true,
    },
    /* providers used to create fake backend */
    usersFakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
