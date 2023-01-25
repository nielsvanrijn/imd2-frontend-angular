import { AuthService } from 'src/app/services/auth.service';
import { startAuthentication } from '@simplewebauthn/browser';

import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public email = '';
	public password = '';

	constructor(
		public auth: AuthService
	) {}

	callLogin(): void {
		this.auth.login(this.email, this.password);
	}

  async loginWebauthn() {
    // do the init call
    const initializeLoginWebauthnRes = await this.auth.initializeLoginWebauthn(this.email);

    // start the login
    const loginResponse = await startAuthentication(initializeLoginWebauthnRes);

    // do the finalize call
    this.auth.finalizeLoginWebauthn(this.email, loginResponse);
  }

}
