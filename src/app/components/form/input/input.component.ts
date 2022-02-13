import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as moment from 'moment';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-input]',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent {
	@Input() label?: string;
	@Input() type: string = 'text';
	@Input() name!: string;
	@Input() placeholder?: string = '';
	@Input() errors?: Array<{location: string; msg: string; param: string}>;
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() icon: IconProp = 'dog';
	@Input() duration: boolean = false;
	@Input() max: number | null = null;

	@Input() inputModel!: any;
	@Output() inputModelChange = new EventEmitter<any>();

	constructor() { }

	get error(): boolean {
		return this.filterdErrors.length > 0;
	}

	get filterdErrors(): string[] {
		return this.errors ? this.errors.filter((e) => e.param === this.name).map((e) => e.msg) : [];
	}

	get humanizedDuration(): string {
		let durationFormatted = '';
		const hours = moment.duration(this.inputModel, 'minutes').hours();
		if(hours > 0) durationFormatted += `${hours}h `;
		const minutes = moment.duration(this.inputModel, 'minutes').minutes();
		durationFormatted += `${minutes}m`;
		return durationFormatted;
	}

	emit() {
		if (this.type === 'number') {
			this.inputModelChange.emit(+this.inputModel);
		} else {
			this.inputModelChange.emit(this.inputModel);
		}
	}

}
