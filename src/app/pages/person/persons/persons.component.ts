import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/app/models/Person';
import { MovieService } from 'src/app/services/movie.service';

@Component({
	selector: 'app-persons',
	templateUrl: './persons.component.html',
	styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {

	readonly persons$ = new BehaviorSubject<Person[] | null>(null);

	constructor(
		public router: Router,
		public movieService: MovieService
	) {
		this.callgetAllPersons();
	}

	callgetAllPersons() {
		this.movieService.getAllPersons().subscribe({
			next: (result) => this.persons$.next(plainToInstance(Person, result)),
			error: (e) => console.log(e)
		});
	}

}
