import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Role, User } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class LoginService {
  userLogged = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    // this.http
    //   .post(`${environment.apiUrl}/core/api/v1/logout`, {
    //     refreshToken: this.userLogged.value ? this.userLogged : null,
    //   })
    //   .subscribe(() => {
    //     this.userLogged.next(null);
    //     localStorage.removeItem('userData');
    //     this.router.navigate(['/login']);
    //   });
    this.userLogged.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return (
      this.http
        // .post<User>(`${environment.apiUrl}/core/api/v1/login`,
        .post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
        // .post<AuthResponse>('http://18.185.125.149:8080/auth/login', {
          username,
          password,
        })
        .pipe(
          map((responseData) => {
            return { ...responseData };
          }),
          tap((user) => {
            // this.userLogged.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
            // this.redirectUserByRole(user.role);
          })
        )
    );
  }

  // refresh(): Observable<User> {
  //   return this.http
  //     .post<User>(`${environment.apiUrl}/core/api/v1/refresh`, {
  //       refreshToken: this.userLogged.value ? this.userLogged : null,
  //     })
  //     .pipe(
  //       map((responseData) => {
  //         const expirationDate = new Date(
  //           new Date().getTime() + +responseData * 1000
  //         );
  //         return { ...responseData, expirationDate };
  //       }),
  //       tap((user) => {
  //         this.userLogged.next(user);
  //         localStorage.setItem('userData', JSON.stringify(user));
  //       })
  //     );
  // }

  autoLogin(): void {
    const localStorageData = localStorage.getItem('userData');
    if (localStorageData) {
      const userData: User = JSON.parse(localStorageData);
      if (userData) {
        this.userLogged.next(userData);
      }
    }
  }

  // getUserDetails(): Observable<UserDetails> {
  //   return this.userLogged.asObservable().pipe(
  //     map(user => {
  //       return {
  //         idUser: user ? user.userDetails.userId : "",
  //         username: user ? user.userDetails.username : "",
  //       };
  //     })
  //   );
  // }

  private redirectUserByRole(role: Role): void {
    switch (role) {
      case Role.DOCTOR:
        this.router.navigate(['/requests']);
        break;
      case Role.PATIENT:
        this.router.navigate(['/requests']);
        break;
      default:
        this.router.navigate(['/holidays']);
    }
  }
}
