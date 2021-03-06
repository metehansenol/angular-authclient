import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthFakeBackendInterceptor, authFakeBackendProvider } from './auth.fakebackend';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home.component';
import { LoginComponent } from './login/login.component';

import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user.component';
import { EditUserComponent } from './users/edit-user.component';

import { UserService } from './services/user.sevice';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    LoginComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule /*this should be last*/
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthFakeBackendInterceptor,
      multi: true,
    },
    /* providers used to create fake backend */
    authFakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
