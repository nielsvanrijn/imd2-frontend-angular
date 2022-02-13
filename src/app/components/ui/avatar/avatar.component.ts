import { Component, Input } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-avatar]',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
	@Input() name: string = 'John Doe';
	@Input() src?: string;

	constructor() { }

	get computedName(): string {
		return (this.name.match(/(\b\w{1})?.*(\b\w{1})/)![1] ? this.name.match(/(\b\w{1})?.*(\b\w{1})/)![1].toUpperCase() + this.name.match(/(\b\w{1})?.*(\b\w{1})/)![2].toUpperCase() : this.name.match(/(\b\w{1})?.*(\b\w{1})/)![0].toUpperCase());
	}

}
