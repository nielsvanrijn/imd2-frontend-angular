import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { dropdownHideShowAnimation } from 'src/app/animations/fade.animation';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	animations: [
		dropdownHideShowAnimation,
	]
})
export class DropdownComponent implements OnInit {
	@Input() label: string = 'select';
	@Input() options: Array<any> = [];
	@Input() labelKey: string = 'label';
	@Input() dataKey: string;
	@Input() toggleStatesKey: string;
	@Input() single: boolean = true;
	@Output() toggleEvent = new EventEmitter<any>();
	lastToggledOptionIndex = NaN;
	selectedOption: any;
	selectedOptions: Array<any> = [];
	selectedState: any;
	open = false;

	constructor() {}

	ngOnInit(): void {
		if (this.toggleStatesKey) {
			this.selectedOption = this.options[0][this.labelKey];
			this.selectedState = this.options[0][this.toggleStatesKey][0];
			this.options.forEach((option) => option.currentState = option[this.toggleStatesKey][0]);
		}
	}

	toggle(option: any) {
		if (this.toggleStatesKey) {
			// set all other options back to first state
			const otherOptions = this.options.filter((o) => o[this.labelKey] !== option[this.labelKey]);
			otherOptions.forEach((o) => o.currentState = o[this.toggleStatesKey][0]);

			this.selectedOption = option[this.labelKey].toLowerCase();
			const currentStateIndex = option[this.toggleStatesKey].indexOf(option.currentState);
			if ((currentStateIndex + 1) === option[this.toggleStatesKey].length) {
				option.currentState = option[this.toggleStatesKey][0];
				this.selectedState = option[this.toggleStatesKey][0];
			} else {
				option.currentState = option[this.toggleStatesKey][currentStateIndex + 1];
				this.selectedState = option[this.toggleStatesKey][currentStateIndex + 1];
			}
			this.toggleEvent.emit({option: this.selectedOption, state: this.selectedState});
		} else if(!this.single) {
			if (this.selectedOptions.includes(this.dataKey ? option[this.dataKey] : option)) this.selectedOptions = this.selectedOptions.filter((selectedOption) => selectedOption !== this.dataKey ? option[this.dataKey] : option);
			else this.selectedOptions.push(this.dataKey ? option[this.dataKey] : option);
			console.log(this.selectedOptions);
			this.toggleEvent.emit(this.selectedOptions);
		} else {
			// single functionality
		}
	}

	currentStateIndex(option: any) {
		return option[this.toggleStatesKey].indexOf(option.currentState);
	}

	get iconsExist(): boolean {
		return this.options.every(o => o.hasOwnProperty('icons'));
	}
}
