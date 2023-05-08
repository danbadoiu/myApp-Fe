import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  hasPermission(arg0: string) {
    throw new Error('Method not implemented.');
  }
  hasRole(role: any) {
    if (role == 'DOCTOR') {
      return true;
    } else return false;
  }
  isAuthenticated() {
    if (localStorage.getItem('userData')) {
      return true;
    } else {
      return false;
    }
  }
  constructor(private router: Router) {}
  getLoggedInUserRole(): string {
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    return storedUser.userDetails.role;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  
}
