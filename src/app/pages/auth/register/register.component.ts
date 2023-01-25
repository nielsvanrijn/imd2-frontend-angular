import { AuthService } from 'src/app/services/auth.service';
import { startRegistration } from '@simplewebauthn/browser';

import { Component } from '@angular/core';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	public name = '';
	public email = '';
	public password = '';
  public webauthnTab = true;

	constructor(
		public auth: AuthService
	) { }

	callRegister(): void {
		this.auth.register(this.name, this.email, this.password);
	}

  async registerWebauthn() {
    // do the init call
    const initializeRegisterWebauthnRes = await this.auth.initializeRegisterWebauthn(this.name, this.email);

    // start the registration
    const registrationResponse = await startRegistration(initializeRegisterWebauthnRes);

    // do the finalize call
    this.auth.finalizeRegisterWebauthn(this.email, registrationResponse);
  }
}
