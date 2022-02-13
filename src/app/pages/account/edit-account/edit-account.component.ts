import { Component } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fade.animation';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-account',
	templateUrl: './edit-account.component.html',
	styleUrls: ['./edit-account.component.scss'],
	animations: [
		fadeInAnimation,
	]
})
export class EditAccountComponent {
	// user$!: Observable<User>;
  	cached: User = new User;
	errors = ['Name is required'];

	public avatarFileTypes = ['image/heif', 'image/jpeg', 'image/png'];

	constructor(
		public userService: UserService,
		public router: Router,
	) {}

	callUpdateCurrentUser(user: User) {
		this.userService.updateCurrentUser(user).then(() => {
			this.router.navigate(['account']);
		});
	}

	uploadAvatar(file: File) {
		this.userService.updateCurrentUserAvatar(file).catch((err) => {
			console.log(err);
		});
	}

}
