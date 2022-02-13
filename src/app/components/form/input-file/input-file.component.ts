import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
	selector: 'app-input-file',
	templateUrl: './input-file.component.html',
	styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent {
	@Input() label: string = 'Choose';
	@Input() name: string = this.label;
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() group: boolean = false;
	@Input() icon: string = '';
	@Input() errors: string[] = [];
	@Input() supportedFileTypes: string[] = [];

	@Output() fileEvent = new EventEmitter<File>();

	constructor() { }

	get error(): boolean {
		return this.errors ? this.errors.length > 0 : false;
	}

	fileChangeEvent(event: Event) {
		const element = event.target as HTMLInputElement;
		if (element.files && element.files.length > 0) {
			const file = element.files[0];
			if (this.supportedFileTypes.includes(file.type)) {
				this.errors = [];
				this.fileEvent.emit(file);
			} else {
				this.errors.push('Unsupported file type');
				this.errors.push('Please use: ' + this.supportedFileTypes.map((type: string) => type.replace('image/', '.')).join(' ') );
			}
		} else {
			this.errors = [];
		}
	}

	get iconAsIconProp() {
		return this.icon as IconProp;
	}

}
