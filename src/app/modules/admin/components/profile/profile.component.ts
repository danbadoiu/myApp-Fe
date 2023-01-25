import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/login/models/login.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  constructor(private http: HttpClient) { }

   async ngOnInit() {
    // this.user = await this.http
    // .get(`${environment.apiUrl}/core/api/v1/users`)
    // .pipe(
    //   map((responseData) => {
    //     // console.log(responseData.items)
    //     return responseData;
    //   })
    // )
    // .toPromise();
  }
  name = '';
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
