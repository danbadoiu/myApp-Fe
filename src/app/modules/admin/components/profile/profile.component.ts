import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/login/models/login.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: User[] | undefined;
  username?: string;
  loggedUser?: User;
  constructor(private http: HttpClient, private loginService: LoginService) { }

   async ngOnInit() {
    this.users = await this.http
    .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
    .pipe(
      map((responseData) => {
        // console.log(responseData.items)
        return responseData.items;
      })
    )
    .toPromise();
    this.loginService.userLogged.subscribe(user => {
      if (user) {
        this.username = user.username;
      } else {
        this.username = undefined;
      }
      console.log(user)
    });
    this.loggedUser = this.users?.find(
      employee => employee.username === this.username
    );
    console.log(this.loginService.userLogged)
    this.name = this.users?.find(
      employee => employee.username === this.username
    )?.firstName;
    console.log(this.name)
  }
  name:string|undefined
  email = '';
  profilePic = '';

  updateProfile() {
    // code to update the user's information
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.profilePic = file;
    console.log(this.profilePic);
  }}
