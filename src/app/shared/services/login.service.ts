import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map,tap,  Observable } from "rxjs";
import { Role, User } from "src/app/login/models/login.model";
import { environment } from "src/environments/environment";
import { UserDetails } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class LoginService {
  userLogged = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    this.http
      .post(`${environment.apiUrl}/core/api/v1/logout`, {
        refreshToken: this.userLogged.value ? this.userLogged.value.refreshToken : null,
      })
      .subscribe(() => {
        this.userLogged.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      });
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/core/api/v1/login`, {
        username,
        password,
      })
      .pipe(
        map(responseData => {
          return { ...responseData };
        }),
        tap(user => {
          this.userLogged.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.redirectUserByRole(user.userDetails.role);
        })
      );
  }

  refresh(): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/core/api/v1/refresh`, {
        refreshToken: this.userLogged.value ? this.userLogged.value.refreshToken : null,
      })
      .pipe(
        map(responseData => {
          const expirationDate = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );
          return { ...responseData, expirationDate };
        }),
        tap(user => {
          this.userLogged.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin(): void {
      const localStorageData = localStorage.getItem('userData');
      if(localStorageData){
        const userData: User = JSON.parse(localStorageData);
        if (userData && userData.accessToken) {
          this.userLogged.next(userData);
        }
      }
  }

  getUserDetails(): Observable<UserDetails> {
    return this.userLogged.asObservable().pipe(
      map(user => {
        return {
          idUser: user ? user.userDetails.employeeId : "",
          username: user ? user.userDetails.username : "",
        };
      })
    );
  }

  private redirectUserByRole(role: Role): void {
    switch (role) {
      case Role.HR:
        this.router.navigate(['/requests']);
        break;
      case Role.TEAMLEAD:
        this.router.navigate(['/requests']);
        break;
      default:
        this.router.navigate(['/holidays']);
    }
  }
}
