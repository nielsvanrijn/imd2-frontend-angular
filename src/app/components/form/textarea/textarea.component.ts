import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-text-area]',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss']
})
export class TextAreaComponent {
	@Input() label?: string;
	@Input() name!: string;
	@Input() rows: string = '3';
	@Input() cols: string = '3';
	@Input() placeholder?: string = '';
	@Input() errors?: Array<{location: string; msg: string; param: string}>;
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() iconStyle: 'solid' | 'regular' | 'light' | 'duotone' = 'regular';
	@Input() iconName: string = '';

	@Input() inputModel!: string | undefined;
	@Output() inputModelChange = new EventEmitter<string>();

	constructor() { }

	get error(): boolean {
		return this.filterdErrors.length > 0;
	}

	get filterdErrors(): string[] {
		return this.errors ? this.errors.filter((e) => e.param === this.name).map((e) => e.msg) : [];
	}

}
