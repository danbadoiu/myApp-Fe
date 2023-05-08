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

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (this.authService.isAuthenticated()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // check if the user is authenticated
      if (this.authService.isAuthenticated()) {
        
        // check if the user has the necessary role or permission to access the route
        if (this.authService.isAuthenticated()) {
          return true;
        }
        
        // if the user is not authorized, redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }

      // if the user is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
  }
}





  

