import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginForm } from '@models/login-form.model';
import { API_URL } from '../app.module';
import { tap, BehaviorSubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  private connectedUser: BehaviorSubject<any> = new BehaviorSubject(null);
  connectedUser$ = this.connectedUser.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  signIn(login: LoginForm) {
    return this.http
      .post<{ jwt: string }>(`/api/auth/local`, login)
      .pipe(
        tap(({ jwt }) => {
          this.saveToken(jwt);
          this.isLoggedIn.next(true);
        }),
        switchMap((result) => {
          return this.getUserInfos();
        }),
        tap((user: any) => {
          this.connectedUser.next(user);
        })
      );
  }

  connectedUserRole() {
    return this.connectedUser.value?.role?.name;
  }

  getUserInfos() {
    return this.http.get(`/api/users/me?populate=*`).pipe(
      tap((user: any) => {
        this.isLoggedIn.next(true);
        this.connectedUser.next(user);
      })
    );
  }

  isLoggedInValue() {
    return this.isLoggedIn.value;
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.connectedUser.next(null);
  }
}
