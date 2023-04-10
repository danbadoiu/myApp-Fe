import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';
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
  profileImage: SafeUrl | undefined;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.users = await this.http
      .get<User[]>('http://localhost:8080/user')
      .pipe(
        map((responseData) => {
          return responseData;
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

    this.profilePicture = this.loggedUser?.profilePicture;
    // let reader = new FileReader();
    // reader.readAsDataURL(this.profilePicture);
    // reader.onload = () => {
    //   if (reader.result != null) {
    //     this.profilePic = reader.result;
    //   }
    // };
    // const myString = this.loggedUser?.profilePicture;
    // console.log(myString);

    // const fileReader = new FileReader();
    // fileReader.onload = function (event) {
    //   const contents = event.target!.result;
    //   console.log(contents);
    // };
    // fileReader.readAsDataURL(myString!);
    this.createProfileImage(this.loggedUser?.profilePicture!)
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
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    if (!image) {
      this.profileImage = './assets/user_image_placeholder.svg';
    }
  }
}
