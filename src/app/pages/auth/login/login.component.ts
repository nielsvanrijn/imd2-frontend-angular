import { AuthService } from 'src/app/services/auth.service';

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

}
