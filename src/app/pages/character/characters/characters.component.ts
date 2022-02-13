import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

	readonly characters$ = new BehaviorSubject<Character[] | null>(null);

	constructor(
		public router: Router,
		public characterService: CharacterService,
	) {
		this.callGetAllCharacters();
	}

	callGetAllCharacters() {
		this.characterService.getAllCharacters().subscribe({
			next: (result) => this.characters$.next(plainToInstance(Character, result)),
			error: (e) => console.log(e)
		});
	}

}
