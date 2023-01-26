import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    role: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.userService
      .addUser({
        id: '',
        username: this.form.username,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        password: this.form.password,
        email: this.form.email,
        role: this.form.role,
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
