import { AuthService } from 'src/app/services/auth.service';

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

	constructor(
		public auth: AuthService
	) { }

	callRegister(): void {
		this.auth.register(this.name, this.email, this.password);
	}

}
