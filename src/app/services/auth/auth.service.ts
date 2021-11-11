import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userLoggedIn = new BehaviorSubject<any>(null);



  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}login`, { username, password })
      .pipe(
        tap(
          (data) => {
            if (data) {
              console.log('data: ', data);
              console.log('data.token: ', data.token);
              localStorage.setItem('bloglist-user', JSON.stringify({ username: data.username, name: data.name }));
              localStorage.setItem('bloglist-user-token', data.token);
              this.userLoggedIn.next({
                username: data.username,
                name: data.name,
              });
            }
          },
          (error) => {
            localStorage.removeItem('bloglist-user');
            this.userLoggedIn.next(null);
          }
        )
      );
  }
}