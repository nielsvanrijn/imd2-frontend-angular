import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { selectHideShowAnimation } from 'src/app/animations/fade.animation';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-select-old]',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	animations: [
		selectHideShowAnimation
	]
})
export class SelectOldComponent implements OnInit {
	@Input() label?: string;
	@Input() name!: string;
	@Input() options: Array<any> = [];
	@Input() labelKey = 'name';
	@Input() dataKey = 'id';
	@Input() sort: 'labelKey' | 'dataKey' | null = 'dataKey';
	@Input() placeholder? = 'Please select an option';
	@Input() errors?: Array<{location: string; msg: string; param: string}>;
	@Input() single? = false;

	@Input() inputModel!: any;
	@Output() inputModelChange = new EventEmitter<any>();
	public open = false;
	public highlightedOptionIndex: number = -1;
	public selectedOptions: Array<string | number> = [];
	public selectedOption: string | number = NaN;

	@ViewChild('buttonEl', { read: ElementRef, static: true }) 
	private buttonEl : ElementRef;
	@ViewChild('optionsEl') 
	private optionsEl : ElementRef;

	constructor() { }
	
	ngOnInit(): void {
		// if (this.name === 'cast') {
			// console.log(this.name);
			// console.log(this.inputModel);
			// console.log(this.options);
		// }

		this.selectedOptions = this.inputModel ? this.inputModel : [];
	}

	selectedOptionsLabels(): string {
		if (this.single) return this.options.find((option) => option[this.dataKey] === this.selectedOption) ? this.options.find((option) => option[this.dataKey] === this.selectedOption)[this.labelKey] : ''
		else return this.options.filter((option) => this.selectedOptions.includes(option[this.dataKey])).map((option) => option[this.labelKey]).join(', ')
	}

	toggleOption(option: any) {
		if (this.single) {
			this.selectedOption = option[this.dataKey];
			this.inputModelChange.emit(this.selectedOption);
			this.open = false;
		} else {
			if (this.selectedOptions.includes(option[this.dataKey])) this.selectedOptions = this.selectedOptions.filter((selectedOption) => selectedOption !== option[this.dataKey])
			else this.selectedOptions.push(option[this.dataKey]);
			this.inputModelChange.emit(this.selectedOptions);
		}
	}

	get sortedOptions(): Array<any> {
		if (this.sort !== null) return this.options.sort((a, b) => a[this.sort!] - b[this.sort!])
		else return this.options
	}

	public onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				this.open = false;
				this.buttonEl.nativeElement.focus();
				break;
			case 'Tab':
				if (this.open) this.open = false;
				break;
			case ' ':
				event.preventDefault();
				if (this.open) this.optionsEl.nativeElement.children[this.highlightedOptionIndex].click();
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
			case 'Enter':
				event.preventDefault();
				if (this.open) this.optionsEl.nativeElement.children[this.highlightedOptionIndex].click() // shift focus up
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (this.open) {
					const nextSibling = this.optionsEl.nativeElement.children[this.highlightedOptionIndex].nextSibling;
					const nextSiblingExsistsOrIsLi = nextSibling && nextSibling.tagName === 'LI';
					this.highlightedOptionIndex = nextSiblingExsistsOrIsLi ? +nextSibling.dataset.index : 0;
					this.optionsEl.nativeElement.scrollTop = nextSibling.offsetTop - (this.optionsEl.nativeElement.offsetHeight / 2);
				}
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (this.open) {
					const prevSibling = this.optionsEl.nativeElement.children[this.highlightedOptionIndex].previousSibling;
					const prevSiblingExsistsOrIsLi = prevSibling && prevSibling.tagName === 'LI';
					this.highlightedOptionIndex = prevSiblingExsistsOrIsLi ? +prevSibling.dataset.index : (this.optionsEl.nativeElement.children.length - 1);
					if (prevSibling) this.optionsEl.nativeElement.scrollTop = prevSibling.offsetTop - (this.optionsEl.nativeElement.offsetHeight / 2);
					else this.optionsEl.nativeElement.scrollTop = this.optionsEl.nativeElement.scrollHeight;
				}
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
		}
	}

	public setFocus(): void {
		if (this.optionsEl && this.optionsEl.nativeElement.children.length > 0) {
			if (this.selectedOptions.length > 0) {
				this.highlightedOptionIndex = +this.optionsEl.nativeElement.children.namedItem(this.selectedOptions[0].toString()).dataset.index;
			} else {
				this.highlightedOptionIndex = 0;
			}
		}
	}

	get error(): boolean {
		return this.filterdErrors.length > 0;
	}

	get filterdErrors(): string[] {
		return this.errors ? this.errors.filter((e) => e.param === this.name).map((e) => e.msg) : [];
	}
}
