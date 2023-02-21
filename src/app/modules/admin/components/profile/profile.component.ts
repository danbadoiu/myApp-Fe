import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/login/models/login.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: User[] | undefined;
  username?: string;
  loggedUser?: User;
  profilePicture?: any;
  profilePic: any;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.users = await this.http
      .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      )
      .toPromise();
    this.setUser();
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.username = storedUser.userDetails.username;

    this.loggedUser = this.users?.find(
      (employee) => employee.username === this.username
    );
    this.name = this.users?.find(
      (employee) => employee.username === this.username
    )?.firstName;
    console.log(this.loggedUser);
    console.log(this.loggedUser?.profilePicture)
    this.profilePicture = this.loggedUser?.profilePicture;
    let reader = new FileReader();
    reader.readAsDataURL(this.profilePicture);
    reader.onload = () => {
      if (reader.result != null) {
        this.profilePic = reader.result;
      }
    };
    const myString = this.loggedUser?.profilePicture;
    console.log(myString);

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const contents = event.target!.result;
      console.log(contents);
    };
    fileReader.readAsDataURL(myString!);
  }

  name: string | undefined;
  email = '';

  updateProfile() {
    // code to update the user's information
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.profilePic = file;
  }
  setUser() {
    this.loggedUser = this.users?.find(
      (user) => user.username == this.userService.getUsername()
    );
  }
}
