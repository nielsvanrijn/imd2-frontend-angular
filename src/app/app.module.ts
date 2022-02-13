import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconsModule } from '@ng-icons/core';
import { 
	HeroUsers, HeroChevronDownSolid, HeroCheckCircleSolid, HeroSearchSolid,
	HeroFilm, HeroUserCircle, HeroPlusSm, HeroSelectorSolid,
	HeroChevronLeftSolid, HeroChevronRightSolid } from '@ng-icons/heroicons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TokenInterceptor } from './token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { InputFileComponent } from './components/form/input-file/input-file.component';
import { InputComponent } from './components/form/input/input.component';
import { AvatarComponent } from './components/ui/avatar/avatar.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { AccountComponent } from './pages/account/account/account.component';
import { MovieComponent } from './pages/movie/movie/movie.component';
import { MoviesComponent } from './pages/movie/movies/movies.component';
import { ButtonComponent } from './components/form/button/button.component';
import { TextAreaComponent } from './components/form/textarea/textarea.component';
import { SelectOldComponent } from './components/form/select-old/select.component';
import { SelectComponent } from './components/form/select/select.component';
import { DropdownComponent } from './components/ui/dropdown/dropdown.component';
import { PersonsComponent } from './pages/person/persons/persons.component';
import { PersonComponent } from './pages/person/person/person.component';
import { CharactersComponent } from './pages/character/characters/characters.component';
import { CharacterComponent } from './pages/character/character/character.component';

@NgModule({
	declarations: [
		AppComponent,
		ClickOutsideDirective,
		NavbarComponent,
		LoginComponent,
		RegisterComponent,
		InputFileComponent,
		InputComponent,
		AvatarComponent,
		EditAccountComponent,
		AccountComponent,
		MovieComponent,
		MoviesComponent,
		ButtonComponent,
		TextAreaComponent,
  		SelectOldComponent,
    	SelectComponent,
     	DropdownComponent,
      PersonsComponent,
      PersonComponent,
      CharactersComponent,
      CharacterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		NgIconsModule.withIcons({
			HeroUsers,
			HeroChevronDownSolid,
			HeroCheckCircleSolid,
			HeroSearchSolid,
			HeroFilm,
			HeroUserCircle,
			HeroPlusSm,
			HeroSelectorSolid,
			HeroChevronLeftSolid,
			HeroChevronRightSolid,
		}),
  		FontAwesomeModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
