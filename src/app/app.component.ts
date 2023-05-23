import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { LoaderService } from './modules/admin/shared/services/loader.service';
import { UserService } from './modules/admin/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;

  constructor(private user: UserService,private loaderService: LoaderService, private renderer: Renderer2) {}

  ngOnInit(): void {}

  logout(): void {
    window.location.reload();
  }
  
}
