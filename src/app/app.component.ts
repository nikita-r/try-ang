import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'try-ang';

  public isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
      this.oktaAuth.signInWithRedirect({
        originalUri: '/profile'
      });
  }
  logout() {
      this.oktaAuth.signOut();
  }
}
