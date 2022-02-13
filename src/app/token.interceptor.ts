import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators'; 

import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';

import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(
		public auth: AuthService
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.auth.getJwtToken()) {
			request = this.addToken(request, this.auth.getJwtToken()!);
		}

		return next.handle(request).pipe(catchError(error => {
			if (error instanceof HttpErrorResponse && error.status === 401 && error.url && !error.url.includes('upload.nielsapps')) {
				return this.handle401Error(request, next);
			} else {
				return throwError(error);
			}
		}));
	}

	private addToken(request: HttpRequest<any>, token: string) {
		return request.clone({
			setHeaders: {
				'Authorization': `Bearer ${token}`
			}
		});
	}

	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

			return this.auth.refreshToken().pipe(
				switchMap((response: any) => {
					this.isRefreshing = false;
					this.refreshTokenSubject.next(response.accessToken);
					return next.handle(this.addToken(request, response.accessToken));
				}),
				catchError((e) => {
					this.auth.removeTokens();
					return throwError(e);
				})
			);

		} else {
			return this.refreshTokenSubject.pipe(
				filter(token => token != null),
				take(1),
				switchMap(jwt => {
					return next.handle(this.addToken(request, jwt));
				}));
		}
	}
	
}
