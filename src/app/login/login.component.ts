import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.loginSubscription = this.loginService
      .login(username, password)
      .subscribe(() => {
        this.userLogged = true;
        this.newItemEvent.emit(this.userLogged);
        localStorage.setItem(username,password);
        this.router.navigate(['home']);
      });
  }
}
