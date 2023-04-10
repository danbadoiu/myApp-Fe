import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/login.model';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0
  loggedUserRole: string|undefined
  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute) {}

  ngOnInit() {
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUserRole = storedUser.userDetails.role;
  }
  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
 
  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
