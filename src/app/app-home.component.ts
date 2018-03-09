import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h1>Angular AuthClient Example</h1>
    <hr />
    <button routerLink="/users">Users</button>
  `
})
export class AppHomeComponent {

}
