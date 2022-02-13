import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { LoginGuard } from './login.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AccountComponent } from './pages/account/account/account.component';
import { AuthGuard } from './auth.guard';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { MoviesComponent } from './pages/movie/movies/movies.component';
import { MovieComponent } from './pages/movie/movie/movie.component';
import { PersonsComponent } from './pages/person/persons/persons.component';
import { PersonComponent } from './pages/person/person/person.component';
import { CharactersComponent } from './pages/character/characters/characters.component';
import { CharacterComponent } from './pages/character/character/character.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
	{ path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
	{ path: 'account-edit', component: EditAccountComponent, canActivate: [AuthGuard] },

	{ path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
	{ path: 'movie', component: MovieComponent, canActivate: [AuthGuard] },
	{ path: 'movie/:id', component: MovieComponent, canActivate: [AuthGuard] },

	{ path: 'persons', component: PersonsComponent, canActivate: [AuthGuard] },
	{ path: 'person', component: PersonComponent, canActivate: [AuthGuard] },
	{ path: 'person/:id', component: PersonComponent, canActivate: [AuthGuard] },

	{ path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
	{ path: 'character', component: CharacterComponent, canActivate: [AuthGuard] },
	{ path: 'character/:id', component: CharacterComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
