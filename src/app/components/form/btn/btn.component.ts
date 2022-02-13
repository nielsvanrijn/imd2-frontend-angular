import { Component, Input } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-btn]',
	templateUrl: './btn.component.html',
	styleUrls: ['./btn.component.scss']
})
export class BtnComponent {
	@Input() label: string = 'Label';
	constructor() { }

}
