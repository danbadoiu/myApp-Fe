import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/admin/shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedUserRole: string | undefined;
  userLogged: string | undefined;
  idLoggedUser: string | undefined;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUserRole = storedUser.userDetails.role;
    this.userLogged = storedUser.userDetails.username;
    this.idLoggedUser = storedUser.userDetails.id;
    console.log(this.idLoggedUser)
  }
  onLogout() {
    localStorage.setItem('hasShownModal', 'false');
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
