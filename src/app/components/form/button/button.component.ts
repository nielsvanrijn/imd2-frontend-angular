import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-button]',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() label: string = 'Label';
	@Input() size: 'tiny' | 'small' | 'medium' | 'large' = 'medium';
	@Input() design: 'primary' | 'secondary' | 'tertiary' = 'primary';
	@Input() color: string = 'primary';
	@Input() disabled: boolean = false;
	@Input() icon: string = '';
	@Input() iconStyle: 'solid' | 'regular' | 'light' | 'thin' | 'duotone' = 'regular';
	@Input() iconPosition: 'left' | 'right' = 'left';
	@Output() EE = new EventEmitter<MouseEvent>();

	constructor() { }

	public get class(): string {
		let classStr = '';
		if (this.size === 'small' || this.size === 'tiny') classStr += 'text-xs '
		if (this.iconPosition === 'left') {
			if (this.size === 'large') classStr += 'mr-2 -ml-2'
			else classStr += 'mr-1 -ml-1'
		}
		if (this.iconPosition === 'right') {
			if (this.size === 'large') classStr += 'ml-2 -mr-2'
			if (this.size === 'small') classStr += 'ml-2'
			else classStr += 'ml-1 -mr-1'
		}
		classStr += ` fa-${this.iconStyle} ${this.icon}`;
		return classStr;
	}
}

