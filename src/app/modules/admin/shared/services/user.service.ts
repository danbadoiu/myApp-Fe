import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isUserLoggedIn = false;
  userLogged: User | undefined;
  username: string = '';
  users: User[] = [];
  constructor(private http: HttpClient) {
    // this.isUserLoggedIn = false;
  }
  setUserLoggedIn(username: string) {
    this.isUserLoggedIn = true;
    this.username = username;
  }
  getUserLoggedIn() {
    if (this.userLogged?.role === 'DOCTOR') {
      console.log(this.userLogged.role);
      return this.isUserLoggedIn;
    } else return false;
  }
  getUsername() {
    return this.username;
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user`).pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }
  getUserById(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/user/2');
  }

  addUser(user: User): Observable<User> {
    const user2 = JSON.stringify(user);
    const formData = new FormData();
    formData.append('profilePicture', user.profilePicture);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('password', user.password);
    formData.append('domain', user.domain!);

    return this.http.post<User>(
      `${environment.apiUrl}/auth/signup`,
      formData
    );
  }
}
