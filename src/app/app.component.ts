import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    
  }

  logout(): void {
    window.location.reload();
  }
}
