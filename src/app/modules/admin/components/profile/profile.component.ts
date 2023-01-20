import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
