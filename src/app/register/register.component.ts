import { HttpClient } from '@angular/common/http';
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
    profilePicture: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  profilePic: any;
  profilePicture: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

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
        profilePicture: this.profilePicture,
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
  onFileChanged(event: any) {
    const file = event.target.files[0]
    console.log(file)
     this.profilePicture = file.name
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result != null){
      this.profilePic = reader.result;}
    };
    console.log(event.target.files[0])
  }
}
