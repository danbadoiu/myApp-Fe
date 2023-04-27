import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../modules/admin/shared/services/login.service';
import { UserService } from '../modules/admin/shared/services/user.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
onRegister() {
  this.router.navigate(['register']);
}
  form: any = {
    username: null,
    password: null,
  };
  private loginSubscription = new Subscription();
  isLoggedIn = false;
  isLoginFailed = false;
  @Input() userLogged=false;
  @Output() newItemEvent = new EventEmitter<boolean>();
  errorMessage = '';
  roles: string[] = [];
  credentialsInvalid: any = false;
  // const storedUser = JSON.parse(localStorage.getItem("user"));

  constructor(private loginService: LoginService, private router: Router,
    private user: UserService) {}

  ngOnInit(): void {
  }

  onSubmit(): void {

    const { username, password } = this.form;

    this.loginSubscription = this.loginService
      .login(username, password)
      .subscribe(() => {
        this.userLogged = true;
        // this.user.setUserLoggedIn(username);
        // // localStorage.setItem("user", JSON.stringify(this.user));


        
          this.router.navigate(['admin']);

      });
  }
}
