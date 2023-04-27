import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/admin/shared/services/auth.service';
import { UserService } from './shared/services/user.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthguardGuard implements CanActivate {
//   constructor(private user: UserService){

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.user.getUserLoggedIn();
//   }
  
// }
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated() && this.authService.hasRole("DOCTOR")) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
