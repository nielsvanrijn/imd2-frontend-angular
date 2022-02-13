import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { Tokens } from '../models/Tokens';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public loginErrors: any = {};
	public registerErrors: any = {};

	constructor(
		public router: Router,
		private http: HttpClient
	) { }

	login(email: string, password: string): void {
		const data = {
			email,
			password
		};
		this.http.post(`${environment.apiUrl}/login`, data, {withCredentials: true}).toPromise().then((result: any) => {
			this.loginErrors = {};
			this.router.navigate(['account']);
			this.storeToken(result.accessToken);
		}).catch((err) => {
			this.loginErrors = {};
			this.loginErrors = err.error.reduce((pV: any, cV: any) => { 
				return {
					...pV,
					[cV.param]: err.error.filter((e: any) => e.param === cV.param).map((er: any) => er.param === cV.param ? er.msg : null),
				};
			}, this.loginErrors);
			console.log('login errors', this.loginErrors);
		});
	}

	logout(email: string): void {
		const data = {
			email,
		};
		this.http.post(`${environment.apiUrl}/logout`, data, { withCredentials: true }).toPromise().then((result: any) => {
			this.storeToken('');
			this.router.navigate(['']);
		}).catch((err) => {
			console.log('logout errors', err);
		});
	}

	register(name: string, email: string, password: string): void {
		const data = {
			name, 
			email,
			password
		};
		this.http.post(`${environment.apiUrl}/register`, data, { withCredentials: true }).toPromise().then(() => {
			this.registerErrors = {};
			this.router.navigate(['']);
		}).catch((err) => {
			console.log(err);
			this.registerErrors = {};
			this.registerErrors = err.error.reduce((pV: any, cV: any) => { 
				return {
					...pV,
					[cV.param]: err.error.filter((e: any) => e.param === cV.param).map((er: any) => er.param === cV.param ? er.msg : null),
				};
			}, this.registerErrors);
			console.log('register errors', this.registerErrors);
		});
	}

	isLoggedIn() {
		return !!this.getJwtToken();
	}

	refreshToken() {
		return this.http.post<any>(`${environment.apiUrl}/refesh_token`, null, { withCredentials: true })
			.pipe(tap((result: any) => {
				this.storeToken(result.accessToken);
			}));
	}
	
	getJwtToken() {
		return localStorage.getItem('ac');
	}

	private storeToken(token: string) {
		localStorage.setItem('ac', token);
	}

	public removeTokens() {
		localStorage.removeItem('ac');
	}
}