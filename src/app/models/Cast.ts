import { Character } from "./Character";

export class Cast {
	character: Character;
	characterId?: number;
	movieId!: number;
	personId!: number;
	createdAt?: Date;
	updatedAt?: Date;
}