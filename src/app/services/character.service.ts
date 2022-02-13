import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/Genre';

@Injectable({
	providedIn: 'root'
})
export class CharacterService {

	constructor(
		private http: HttpClient
	) { }

	getAllCharacters() {
		return this.http.get<Genre[]>(`${environment.apiUrl}/characters`);
	}
}
