import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { fadeInAnimation } from 'src/app/animations/fade.animation';
import { Genre } from 'src/app/models/Genre';
import { Movie } from 'src/app/models/Movie';
import { Person } from 'src/app/models/Person';
import { MovieService } from 'src/app/services/movie.service';
import { BehaviorSubject } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss'],
	animations: [
		fadeInAnimation,
	]
})
export class MovieComponent {
	id: number | null = null;
	errorResponse: Array<{location: string; msg: string; param: string}> = [];
	readonly moviePosterFileTypes = ['image/heif', 'image/jpeg', 'image/png'];

	readonly movie$ = new BehaviorSubject<Movie | null>(null);
	readonly genres$ = new BehaviorSubject<Genre[] | null>(null);
	readonly persons$ = new BehaviorSubject<Person[] | null>(null);
	readonly characters$ = new BehaviorSubject<Character[] | null>(null);
	personsAsCast: Array<{characterId: number | null; movieId: number | null; personId: number | null; person: Person}> = [];

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		public movieService: MovieService,
		public characterService: CharacterService,
	) {
		this.route.paramMap.subscribe((params: ParamMap) => {
			if(params.get('id')) {
				this.id = +params.get('id')!;
				this.movieService.getMovie(this.id!).subscribe({
					next: (result) => {console.log(plainToInstance(Movie, result)) ;this.movie$.next(plainToInstance(Movie, result))},
					error: (e) => console.log(e)
				})
			} else {
				this.movie$.next(new Movie);
			}
		});
		this.callGetAllGenres();
		this.callgetAllPersons();
		this.callGetAllCharacters();
	}

	callCreateMovie(movie: Movie) {
		if(movie.cast) movie.cast.forEach((c) => {if(!c.characterId) c.characterId = c.character.id});

		this.movieService.createMovie(movie).subscribe({
			next: () => this.router.navigate(['movies']),
			error: (e) => {
				this.errorResponse = e.error;
			},
		});
	}

	callUploadMoviePoster(file: File, action: 'add' | 'update') {
		this.movieService.uploadMoviePoster(file).then((sub) => sub.subscribe({
			next: (result: any) => {
				const currentValue = this.movie$.getValue();
				if (action === 'add') {
					if (currentValue && currentValue.posterUrls) {
						if(currentValue.posterUrls.length > 0) currentValue.posterUrlsIndex += 1;
						currentValue.posterUrls.push(result.url);
					}
					else if(currentValue) currentValue.posterUrls = [result.url];
					this.movie$.next(currentValue);
				} else {
					if (currentValue) currentValue.posterUrls[currentValue.posterUrlsIndex] = result.url;
					this.movie$.next(currentValue);
					this.callUpdateMovie(this.movie$.getValue()!, false);
				}
			},
			error: (e: any) => {
				console.log(e);
			},
		}));
	}

	callDeleteMoviePoster() {
		const filenName = this.movie$.getValue()!.posterUrls[this.movie$.getValue()!.posterUrlsIndex].substring(29);
		this.movieService.deleteMoviePoster(filenName).then((sub) => sub.subscribe({
			next: () => {
				this.resetMoviePosterIndex();
				const currentValue = this.movie$.getValue()!;
				currentValue.posterUrls
				currentValue.posterUrls.splice(currentValue.posterUrls.findIndex((url) => url.includes(filenName)), 1)
				this.callUpdateMovie(this.movie$.getValue()!, false);
			}
		})).catch((e) => {
			console.log(e)
		});
	}

	callGetAllGenres() {
		this.movieService.getAllGenres().subscribe({
			next: (result) => this.genres$.next(plainToInstance(Genre, result)),
			error: (e) => console.log(e)
		});
	}

	callgetAllPersons() {
		this.movieService.getAllPersons().subscribe({
			next: (result) => {
				this.persons$.next(plainToInstance(Person, result));
				this.personsAsCast = plainToInstance(Person, result).map((p) => ({characterId: null, movieId: 3, personId: p.id, person: p})) || []
			},
			error: (e) => console.log(e)
		});
	}

	callGetAllCharacters() {
		this.characterService.getAllCharacters().subscribe({
			next: (result) => this.characters$.next(plainToInstance(Character, result)),
			error: (e) => console.log(e)
		});
	}

	callUpdateMovie(movie: Movie, navigate = true) {
		this.movieService.updateMovie(movie).subscribe({
			next: (result) => navigate ? this.router.navigate(['movies']) : this.movie$.next(plainToInstance(Movie, result)),
			error: (e) => {
				this.errorResponse = e.error;
			},
		});
	}

	findPersonLocally(personId: number) {
		return this.persons$.getValue()?.find((p) => p.id === personId);
	}

	incrementMoviePosterIndex() {
		const updatedMovie = this.movie$.getValue()!;
		updatedMovie.posterUrlsIndex += 1;
		this.movie$.next(updatedMovie);
	}
	decrementMoviePosterIndex() {
		const updatedMovie = this.movie$.getValue()!;
		updatedMovie.posterUrlsIndex -= 1;
		this.movie$.next(updatedMovie);
	}
	resetMoviePosterIndex() {
		const updatedMovie = this.movie$.getValue()!;
		updatedMovie.posterUrlsIndex = 0;
		this.movie$.next(updatedMovie);
	}
}
