import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './login/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isUserLoggedIn = false;
  userLogged: User | undefined
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
    if(this.userLogged?.role === 'DOCTOR'){
      console.log(this.userLogged.role)
    return this.isUserLoggedIn;}
    else return false
  }
  getUsername() {
    return this.username;
  }
  getUsers() : Observable<User[]>{
    return this.http
      .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
      .pipe(
        map((responseData) => {
          // console.log(responseData.items)
          return responseData.items;
          
        })
      );
  }
 
  addUser(user: User):Observable<User>{
    return this.http.post<User>(
      `${environment.apiUrl}/core/api/v1/users`,
      user
    );
  }
}
