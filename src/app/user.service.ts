import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  username:string = '';
  constructor() { 
    this.isUserLoggedIn = false;
  }
  setUserLoggedIn(username: string){
    this.isUserLoggedIn = true;
    this.username = username;
  }
  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
  getUsername(){
    return this.username;
  }
}
