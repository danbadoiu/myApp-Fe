import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/login.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  @Input() user: User | undefined;
  users: User[] | undefined;
  username?: string;
  loggedUser?: User;

  profileImage: SafeUrl | undefined;
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.createProfileImage(this.user?.profilePicture!);
  }
  name: string | undefined;
  email = '';

  uploadFile(event: any) {
    const file = event.target.files[0];
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

  openModal() {}
}
