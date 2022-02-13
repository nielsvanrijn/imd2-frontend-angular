import { fadeInAnimation } from 'src/app/animations/fade.animation';

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		fadeInAnimation
	]
})
export class NavbarComponent {

	public showUserMenu = false;
	
	constructor(
		public auth: AuthService,
		public userService: UserService,
		public router: Router,
	) { }

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

}
