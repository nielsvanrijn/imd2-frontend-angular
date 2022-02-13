import { fadeInAnimation } from 'src/app/animations/fade.animation';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { isNonNull, UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { filter, first } from 'rxjs/operators';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	animations: [
		fadeInAnimation,
	]
})
export class AccountComponent implements OnInit {
	moment = moment;

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

	public steps = [
		{name: 'Create account', done: true },
		{name: 'Add profile picture', done: false },
		{name: 'Add profile bio', done: false },
		{name: 'Add items to watchlist', done: false },
	]

	get firstNotDoneIndex(): number {
		return this.steps.findIndex((s) => !s.done);
	}

	constructor(
		public userService: UserService,
	) { }

	ngOnInit() {
		this.userService.userSubject.pipe(filter(isNonNull), first()).subscribe((user: User) => {
			// console.log(user);
			this.checkSteps(user);
		});
	}

	checkSteps(user: User): void {
		this.steps[1].done = !!user.profile.avatarUrl;
		this.steps[2].done = !!user.profile.bio;
		// this.steps[3].done = user.profile
	}

}
