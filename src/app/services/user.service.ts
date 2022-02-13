import { environment } from 'src/environments/environment';
import { classToPlain, plainToClass } from 'class-transformer';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { hash } from 'bcryptjs';
import { shareReplay, filter } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	public users: User[] = [];
	public readonly userSubject = new BehaviorSubject<User | null>(null);
	public readonly user$ = this.userSubject.asObservable().pipe(filter(isNonNull), shareReplay(1));

	constructor(
		private http: HttpClient
	) {
		this.getCurrentUser();
	}

	//old way may be usefull but meh
	getAllUsers(): void {
		this.http.get(`${environment.apiUrl}/users`).toPromise().then((result: any) => {
			console.log(plainToClass(User, result));
			// this.users = plainToClass(User, result);
		}).catch((err) => {
			console.log(err);
		});
	}

	getCurrentUser(): void {
		this.http.get<User>(`${environment.apiUrl}/user`).toPromise().then((result) => {
			this.userSubject.next(plainToClass(User, result));
		}).catch((err) => {
			console.log('userservice getCurrentUser error', err);
		});
	}
	
	updateCurrentUser(user: User) {
		return this.http.patch<User>(`${environment.apiUrl}/user`, classToPlain(user)).toPromise().then((result) => {
			this.userSubject.next(plainToClass(User, result));
		}).catch((err) => {
			console.log('userservice updateCurrentUser error', err);
		});
	}

	async updateCurrentUserAvatar(file: File): Promise<any> {
		const hashedUsername = await hash(environment.uploadUserName, 12);
		const hashedPassword = await hash(environment.uploadApiPass, 12);
		
		const formData = new FormData();
		formData.append('file', file);
		
		return this.http.post(environment.uploadApiUrl, formData, {headers: {
			Authorization: 'Basic ' + btoa(`${hashedUsername}:${hashedPassword}`)
		}}).toPromise().then((result: any) => {
			this.userSubject.getValue()!.profile.avatarUrl = result.url;
			this.userSubject.next(this.userSubject.getValue()!);
		});
	}
}

export function isNonNull<T>(value: T): value is NonNullable<T> {
	return value != null;
}