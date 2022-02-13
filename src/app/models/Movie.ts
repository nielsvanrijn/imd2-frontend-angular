import { Expose, Transform } from 'class-transformer';
import * as moment from 'moment';
import { Cast } from './Cast';
import { Genre } from './Genre';

export class Movie {
	id!: number;
	name!: string;
	year?: number;
	length?: number;
	description?: string;
	posterUrls: string[];
	posterUrlsIndex: number = 0;
	trailerUrls?: string[];

	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'person')) ? value.map((v: any) => v.person) : value, { toClassOnly: true })
	directors?: number[];

	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'person')) ? value.map((v: any) => v.person) : value, { toClassOnly: true })
	writers?: number[];

	@Transform(({ value }) => value.map((v: any) => {
		v.characterId = v.characterId ?? v.character.id;
		v.personId = v.personId ?? v.person.id;
		return v;
	}), { toPlainOnly: true })
	cast: Cast[];

	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'genre')) ? value.map((v: any) => v.genre) : value, { toClassOnly: true })
	genres?: Genre[];
	
	createdAt!: Date;
	updatedAt!: Date;

	get hasPoster(): boolean {
		return this.posterUrls && this.posterUrls.length > 0;
	}

	get humanizedLenght(): string {
		let durationFormatted = '';
		const hours = moment.duration(this.length, 'minutes').hours();
		if(hours > 0) durationFormatted += `${hours}h `;
		const minutes = moment.duration(this.length, 'minutes').minutes();
		durationFormatted += `${minutes}m`;
		return durationFormatted;
	}
}
